from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

PREDEFINED_RESPONSE = """While specific average likes on reels can vary widely depending on the account size, niche, and audience engagement, we can look at the overall performance metrics for reels to understand their effectiveness:

Reels Performance Metrics:
* *Average Engagement Rate:* Reels have an impressive average engagement rate of *5.2%*, which is higher than static posts (3.1%).
* *Completion Rate:* For 15-second clips, the completion rate is *44%*, indicating that viewers are likely to watch the content in its entirety.
* *Share Rate:* Reels are shared *1.8 times more* than static posts, suggesting they resonate well with audiences.
* *Average Watch Time:* The average watch time for reels is around *12 seconds*.
* *Optimal Length:* The ideal length for reels is between *15-30 seconds* for maximum engagement.

*Engagement Boosts:*
* *Music Inclusion:* Adding music can boost engagement by *23%*.
* *Text Overlay:* Using text overlays can improve retention by *15%*.

*Content Types:*
* *Tutorial Reels:* Receive *45% more saves*.
* *Trending Audio Reels:* Achieve *38% higher reach*.
* *Behind-the-Scenes Content:* Generates *62% more comments*.
* *Product Demonstrations:* Achieve *34% higher click-through rates*.

While exact average likes can vary, focusing on these metrics can help improve the performance of your reels and potentially increase the average likes you receive."""

@app.route("/api/chat", methods=["POST"])
def chat():
    # Add a delay to simulate processing
    time.sleep(3)
    
    return jsonify({
        "status": "success",
        "message": PREDEFINED_RESPONSE
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)