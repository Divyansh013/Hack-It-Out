## Team Name
Epsilon Delta

## Team members name
Ayush Beniwal<br>
Saiyam Jain<br>
Ayush Mishra<br>
Amit Sharma<br>

## A brief about work done till now
We are building a AI powered Health Record Management System, which also allowes real time communication to resolve doubts and improve patient outcomes. So far we are almost done with the frontend , only 2-3 pages are remaining. <br>Authentication has been implemented via google login using the Google Cloud OAuth2 context. We are having different login routes for patient and doctor. So that we can have diffrent user interface for the 2.

Getting initial patient info has been implemented with the help of our gpt3.5turbo chatbot , only some ui improvements are remain. We have used OpenAI's api to implement a personalized way for to get information specific to that particular user with the help of gpt3.5turbo's specific prompt engineered model.We have used special prompts to get the user data in easier to use and follow pattern.<br>  Different prompt engineering is also done to get a summaries user medical history that is both easier for the doctors and the patients to follow The model provides a very personalised and user friendly way for the user to enter information , even providing the ability to change input language, and asking condition specific questions, as well as detecting absurd responses. After we get the information, the model itself generates a JSON file consisting of various user insights like allergies , overview , information about the users age , sex , height , weight etc. We use this information to display on the health history dashboard to display to the doctor as well. This interactive way of asking user data is much better than the traditional way of form filling.


We have also made some progress with user appointments. Its payment gateway is almost ready we are using Razorpay payment gateway for an easier user experience.

### What is left
We need to accept user inputs and froms in the health history , prescriptions and test reports page and display them for the doctor to see , as well as generate particulalr insights for the user in different pages via the use of the models we have already prompt engineered. We will also use the same model to notify the doctor in case a medicine is causing improper reactions for the patient, as well as alert him in case a test report has vastly abnormal values, correlating this information with previous user inputs we got from out personalized chatbot.


## Repository link
https://github.com/SaiRev0/MedifyMe

## Any other link
Deployment Link - [Website](https://medifyme.netlify.app/) <br>
Figma UI Link - [Figma](https://www.figma.com/file/p850Ggh3o7Wx06xZKHPmRP/Epsilon-Delta-HackItOut?node-id=0%3A1&t=irTJFFggJAagLQ1M-1)
