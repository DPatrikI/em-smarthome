🌟 Smart Home Assistant

Welcome to the Smart Home Assistant! Control your home devices effortlessly using text. 🎉

🎈 Features

	•	Light Control: 💡 Turn your lights on or off.
	•	Thermostat Control: 🌡️ Adjust your home’s temperature.
	•	Music Player: 🎵 Play, pause, or adjust the volume of your music.
	•	Chat Interface: 💬 Communicate with your home using natural language.

🚀 Getting Started

Prerequisites

	•	Node.js
	•	npm or yarn
	•	Azure Services, OpenAI

 You'll need these variables in your .env.local:
 
	•	OPENAI_API_KEY=your-openai-api-key
	•	COSMOS_DB_ENDPOINT=your-cosmos-db-endpoint
	•	COSMOS_DB_KEY=your-cosmos-db-key
 	•	COSMOS_DB_DATABASE=your-database-id
	•	COSMOS_DB_CONTAINER=your-container-id

## Reflections 🤔
- What aspects of the integration were the most challenging?

	•	Updating the UI based on the response. Because there are no actual devices that would communicate via API calls, I had to keep track of all the running tools in the chat interface, and extracting the successfulness of the given tool.

- Which parts of the App did you find most engaging to build?

	•	I quite enjoyed the easyness of hooking up the chat interface with Vercel's OpenAI Provider. I decided to try it out for this project, and it was very painless.

- How much time did you spend on this task?

	•	About 6 hours, of which about 4 hours were spent troubleshooting Azure.

- If given additional time, how would you enhance the smart home experience?

	•	I'd add user authentication, and voice chat (for this I'd probably have to ditch the OpenAI Provider, OpenAI released their new voice model).
	


📝 License

This project is licensed under the MIT License.
