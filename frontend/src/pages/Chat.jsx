import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const runFlow = async (message) => {
    const BASE_API_URL = "https://api.langflow.astra.datastax.com";
    const LANGFLOW_ID = "d439818a-10f2-4370-afce-b8c598413289";
    const ENDPOINT = "customer";
    
    try {
      const response = await fetch(
        `${BASE_API_URL}/lf/${LANGFLOW_ID}/api/v1/run/${ENDPOINT}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input_value: message,
            output_type: 'chat',
            input_type: 'chat',
          }),
        }
      );
      
      const data = await response.json();
      return data.outputs[0].outputs[0].results.message.text;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error('Please enter a message', {
        position: "top-right",
        theme: "dark"
      });
      return;
    }

    setLoading(true);

    try {
      const result = await runFlow(message);
      setResponse(result);
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        theme: "dark"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-2xl pt-20 mx-auto p-6">
        <h1 className="text-3xl font-bold text-white">Chat Interface</h1>
        <p className='text-gray-50 pb-5 ml-1 opacity-55'>Welcome to SocialsAI, your own social AI analyst!</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask something..."
              className="w-full h-32 p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 border-2 border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Running flow...
              </>
            ) : (
              'Run Flow'
            )}
          </button>
        </form>

        {response && (
          <div className="mt-6 p-4 bg-gray-900 rounded-lg prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: response }} />
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default Chat;