## Team name
FullStackOverflow
## Team members
1.	Sahil Singh
2.	Akash Vannam


## Idea
IDEA: (track-EDTECH)
The problem statement is designed to assimilate solutions to the widespread and prevalent challenges that modern technology-driven education continues to face despite the rapidly advancing capabilities of today’s web technologies. Our solution aims to address the low student engagement and retention rates by delivering a wholesome and functionality-rich online learning platform that is designed to live up to the academic standards of the future. 
The general structure of the design of the platform and details of how it aims to implement the incumbent functionalities is outlined as follows:
The platform consists of a portal main page that links to components of that enable the registering and logging-in at two hierarchies-student and professor. 
The application incorporates functionalities that are either student facing or professor facing.
Student facing functionalities:
A student who desires to be a user of the platform must first register as a student using his credentials namely :
-Student name
-Organization/institute Roll no.
-An account password (student generated , at registration)  
The student roll no. is made to be used as the log-in username for the individual students at the time of login .
The data corresponding to a Student belonging the set of registered userStudents is defined to contain the aforesaid data-fields in a StudentSchema of the database .
This model contains the following data fields:
-name
-rollnumber
-Password
-semester
-Array of ObjectIDs(i.e references) to the classes in which the student is enrolled.
[NOTE that ,a separate data-collection of the available is defined under the model based on ‘ClassSchema’ ]

Postlogin, the student is redirected to a personalized StudentHomePage , which is essentially a list of classes in which the target student is enrolled .
Each class is leads to the list of Assignments/Tasks ,lectures/resources that have been made available by the respective Course Professor .The tasks provide an option for upload of files/images to the page for submission and displays general status of the assignment in terms of:
-submission due-date
-Grading-status(as in marked/graded/not)
-grades(as allotted by the professor incharge)
-professor’s remarks 
The student home page also provides an option to JOIN/ENROL in a class using the class-specific unique code .(generated at the time of class creation)



PROFESSOR-FACING FUNCTIONALITIES and 
DATA MODEL DESIGN
Then website also employs a ProfessorSchema for storage of Professor data that includes the following:
-Professor name
-Professor UID(a unique alphanumeric code that the professor is assigned and must use for future log-ins)
-List of [references to]classes being undertaken by the respective professor

Post login, the professor is redirected to a ProfessorHomePage which provides options to-
-create a new class
-add/assign new tasks/assignments to students of an existing class
-submissions status of a class for a specific assignment/task in the form of an index displaying the students alongside their submissions.

This(professor-side functionality) would in turn employ the aforementioned Class-centric data model , that enables access to the Student data through references to the students(model) .The student model will also itself be made to store the task status of the tasks assigned to individual students as a list of class task references for perusal/indexing on the student-side of the portal for an authorized student .

Additionals that align the solution to the requirements of the PS:
-the professor-side index of student task/assignment status/grading data can be used to auto-generate a comprehensive course-specific class report for the use of the institution/professor ,
-An additional teaching assistance/doubt resolution feature to make the platform more engaging and life-like .

## Repository link
https://github.com/octosapien/Hack-It-Out-fullstackoverflow-

## Any other relevant link
na

