document.addEventListener('DOMContentLoaded', function () {
    fetchAndRender();

    document.getElementById('formEle').addEventListener('submit', function (event) {
        event.preventDefault();
        addStudent();
        resetForm();
    });
});

async function fetchAndRender() {
    try {
        const res = await axios.get("http://localhost:3000/students")
        const responseData = res.data

        document.getElementById("studentList").innerHTML = "";

        responseData.forEach(student => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${student.rollno}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>
           
            <button onclick="editRecord(${student.id})"><i class="fa fa-edit" style="font-size:24px"></i></button>

            <button onclick="deleteRecord(${student.id})"><i class="fa fa-trash-o" style="font-size:24px"></i></button>
            </td>
        `;
            document.getElementById("studentList").appendChild(row);
        })

    }
    catch (err) {
        console.error("error in get", err)
    }

}

const url = 'http://localhost:3000/students';

function resetForm() {
    document.getElementById("rollnoEle").value = '';
    document.getElementById("nameEle").value = '';
    document.getElementById("ageEle").value = '';
    document.getElementById("courseEle").value = '';
}


async function addStudent() {
    const rollno = document.getElementById("rollnoEle").value;
    const name = document.getElementById("nameEle").value;
    const age = document.getElementById("ageEle").value;
    const course = document.getElementById("courseEle").value;
    const id = Math.floor(Math.random() * 1000).toString()

    try {
        await axios.post(url, { id, rollno, name, age, course });
        fetchAndRender();

    } catch (err) {
        console.error(err);
    }
}

async function deleteRecord(id) {
    try {
        const res = await axios.delete(`http://localhost:3000/students/${id}`);
        console.log(res);
        fetchAndRender();
    } catch (err) {
        console.error(err);
    }
}

async function editRecord(id) {
    const input = document.getElementById("nameEle").value;

    try {
        const res = await axios.patch(`${url}/${id}`, { name: input })
        fetchAndRender()
        console.log(res)
    }
    catch (err) {
        console.log(err)
    }
}
