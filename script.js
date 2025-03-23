document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const form = document.getElementById('studentInputForm');
    const cancelButton = document.getElementById('cancelBtn');
    const addBtn = document.getElementById('addBtn');
    const studentCardsContainer = document.getElementById('studentCardsContainer');

    // Load students from local storage
    loadStudents();

    addBtn.addEventListener('click', () => {
        studentForm.style.display = 'block';
    });

    cancelButton.addEventListener('click', () => {
        studentForm.style.display = 'none';
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        // Get form data
        const firstName = document.getElementById('firstName').value.trim();
        const middleName = document.getElementById('middleName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const address = document.getElementById('address').value.trim();
        const age = document.getElementById('age').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked');
        const aadharNumber = document.getElementById('aadharNumber').value.trim();
        const department = document.getElementById('department').value;
        const section = document.getElementById('section').value;
        const rollNo = document.getElementById('rollNo').value.trim();

        // Validate form data
        if (!firstName || !lastName || !address || !age || !gender || !aadharNumber || !department || !section || !rollNo) {
            alert('Please fill in all required fields.');
            return;
        }

        if (isNaN(age) || age <= 0) {
            alert('Please enter a valid age.');
            return;
        }

        if (isNaN(aadharNumber) || aadharNumber.length !== 12) {
            alert('Please enter a valid 12-digit Aadhar Number.');
            return;
        }

        // Create a new student object
        const student = {
            firstName,
            middleName,
            lastName,
            address,
            age,
            gender: gender.value,
            aadharNumber,
            department,
            section,
            rollNo
        };

        // Save student to local storage
        saveStudent(student);

        // Create a new card for the student
        createStudentCard(student);

        // Clear the form
        form.reset();
        studentForm.style.display = 'none';
    });
// create a studentcard
    function createStudentCard(student) {
        const studentCard = document.createElement('div');
        studentCard.className = 'student-card';
        studentCard.innerHTML = `
            <h3>${student.firstName} ${student.middleName} ${student.lastName}</h3>
            <p><strong>Address:</strong> ${student.address}</p>
            <p><strong>Age:</strong> ${student.age}</p>
            <p><strong>Gender:</strong> ${student.gender}</p>
            <p><strong>Aadhar Number:</strong> ${student.aadharNumber}</p>
            <p><strong>Department:</strong> ${student.department}</p>
            <p><strong>Section:</strong> ${student.section}</p>
            <p><strong>Roll No:</strong> ${student.rollNo}</p>
            <div class="card-buttons">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        // Add the new student card to the container
        studentCardsContainer.appendChild(studentCard);

        // Add event listeners for edit and delete buttons
        studentCard.querySelector('.edit-btn').addEventListener('click', function() {
            editStudent(studentCard, student);
        });

        studentCard.querySelector('.delete-btn').addEventListener('click', function() {
            deleteStudent(studentCard, student);
        });
    }
    // function to aedit the student card previously created

    function editStudent(card, student) {
        document.getElementById('firstName').value = student.firstName;
        document.getElementById('middleName').value = student.middleName;
        document.getElementById('lastName').value = student.lastName;
        document.getElementById('address').value = student.address;
        document.getElementById('age').value = student.age;
        document.querySelector(`input[name="gender"][value="${student.gender}"]`).checked = true;
        document.getElementById('aadharNumber').value = student.aadharNumber;
        document.getElementById('department').value = student.department;
        document.getElementById('section').value = student.section;
        document.getElementById('rollNo').value = student.rollNo;

        // Show the form for editing
        studentForm.style.display = 'block';

        // Remove the card being edited
        card.remove();

        // Remove the student from local storage
        removeStudent(student);
    }

    function deleteStudent(card, student) {
        card.remove();
        removeStudent(student);
    }
    // JSON.parse() converts the JSON string back into an array of objects.

    // If no data exists, it creates an empty array using || [].
    function saveStudent(student) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
    }
// remove te student details from the local storage
    function removeStudent(student) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students = students.filter(s => s.aadharNumber !== student.aadharNumber);
        localStorage.setItem('students', JSON.stringify(students));
    }

    function loadStudents() {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.forEach(student => {
            createStudentCard(student);
        });
    }
});