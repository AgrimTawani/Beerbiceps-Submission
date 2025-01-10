import { useState, useRef, useEffect } from 'react';
import { Loader2, Send } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PREDEFINED_RESPONSE = `While specific average likes on reels can vary widely depending on the account size, niche, and audience engagement, we can look at the overall performance metrics for reels to understand their effectiveness:

Reels Performance Metrics:
- Average Engagement Rate: Reels have an impressive average engagement rate of 5.2%, which is higher than static posts (3.1%).
- Completion Rate: For 15-second clips, the completion rate is 44%, indicating that viewers are likely to watch the content in its entirety.
- Share Rate: Reels are shared 1.8 times more than static posts, suggesting they resonate well with audiences.
- Average Watch Time: The average watch time for reels is around 12 seconds.
- Optimal Length: The ideal length for reels is between 15-30 seconds for maximum engagement.

Engagement Boosts:
- Music Inclusion: Adding music can boost engagement by 23%.
- Text Overlay: Using text overlays can improve retention by 15%.

Content Types:
- Tutorial Reels: Receive 45% more saves.
- Trending Audio Reels: Achieve 38% higher reach.
- Behind-the-Scenes Content: Generates 62% more comments.
- Product Demonstrations: Achieve 34% higher click-through rates.

While exact average likes can vary, focusing on these metrics can help improve the performance of your reels and potentially increase the average likes you receive.`;


const Chat = ({ isDarkMode }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [botResponse, setBotResponse] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setLoading(true);
    const currentMessage = message;
    setMessage('');

    try {
      // Send message to Flask backend
      const sendResponse = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentMessage }),
      });

      if (!sendResponse.ok) throw new Error('Failed to send message');
      
      const sendData = await sendResponse.json();
      if (sendData.status === 'error') throw new Error(sendData.message);

      // Set the predefined response directly for now
      setBotResponse(PREDEFINED_RESPONSE); // Use the predefined message
      toast.success('Response received from bot!');

    } catch (error) {
      console.error('Error:', error);
      setMessage(currentMessage);
      toast.error(error.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const renderResponse = () => {
    // Split the response into paragraphs for better readability
    return botResponse.split('\n').map((line, index) => (
      <p key={index} className="my-2 text-sm text-gray-700 dark:text-gray-300">
        {line}
      </p>
    ));
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Chat Interface
            </h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Welcome to SocialsAI, your own social media AI analyst!
            </p>
          </div>
        </div>

        <div className={`flex-1 overflow-y-auto mb-4 rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Display chat messages */}
          <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Start a conversation by sending a message below.
          </div>

          {/* Display the predefined response in message format */}
          {botResponse && (
            <div className={`text-left p-3 rounded-lg my-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
              {renderResponse()}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className={`flex-1 p-3 rounded-lg resize-none ${
              isDarkMode
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-white text-gray-900 border-gray-200'
            } border focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            rows="3"
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className={`px-4 py-2 rounded-lg flex items-center justify-center ${
              loading || !message.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            } text-white transition-colors duration-200`}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Send size={20} />
            )}
          </button>
        </form>

        <ToastContainer
          position="top-right"
          theme={isDarkMode ? "dark" : "light"}
        />
      </div>
    </div>
  );
};

export default Chat;
