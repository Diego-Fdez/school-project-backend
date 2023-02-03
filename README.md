# School Office backend

### Description:

Project so that the parents of the students can consult the school notes of their children.

### Characteristics:

The project has 3 roles:
Role: not authenticated.
Role: Teacher.
Role: Administrator.

<strong>Not authenticated:</strong> This will only be able to consult your child's information, as well as the student's school notes.

<strong>Teacher:</strong> The teacher can register and consult the school notes of your students. Teacher can also consult levels, courses, sections and semesters.

<strong>Administrator:</strong> The administrator can edit and delete the student's school notes, can consult, create, edit and delete sections, semesters, levels, courses, assign and delete courses to a teacher, assign and delete teachers to a student.

The project has a module to recover the password, which sends an email to the user with a link and a unique token.

# this is the backend of the project (see [frontend](https://github.com/Diego-Fdez/school-app 'frontend')) it was started with npm init

### This Project Only For developing my Skill

Note: Try to make your Own Project , This Only For Reference to it

##### Method to Run Project in your PC:

- git clone https://github.com/Diego-Fdez/school-project-backend.git

- cd App-name

- npm install

- npm run dev

- Check http://localhost:5000

##### Used dependencies For This Project

Node JS
bcrypt
body-parser
cors
dotenv
express
express-validator
jsonwebtoken
mongoose
nodemailer
nodemon
