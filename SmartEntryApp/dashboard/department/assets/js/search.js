function searchStudents() {
    let token = getCookie('token');
    let dept = getCookie('dept');
    if(!token){
        window.location.replace("../../index.html");
    }
    fetch('http://159.65.185.132:8888/smartentry/deptmentstudent', {
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
			dept_id : dept.toUpperCase(),
            token : token
        })
    })
	.then(res => res.json())
    .then(data => {
        // Declare variables
        let input = document.getElementById('search');
        let filter = input.value.toUpperCase();
        const dat = data.student_list;
        // Loop through all the visitors, and show the ones that match
        const val = dat.filter(std => ((std.matric_no.toUpperCase().indexOf(filter) > -1) || (std.first_name.toUpperCase().indexOf(filter) > -1) || (std.last_name.toUpperCase().indexOf(filter) > -1) || (std.sex.toUpperCase().indexOf(filter) > -1) || (std.Department.toUpperCase().indexOf(filter) > -1) || (std.Faculty.toUpperCase().indexOf(filter) > -1) || (std.Status.toUpperCase().indexOf(filter) > -1)));

        document.querySelector('#thead').innerHTML = 
		`<tr>
			<th>S/N</th>
			<th>Matric No.</th>
			<th>FirstName</th>
			<th>LastName</th>
			<th>Sex</th>
			<th>Department</th>
			<th>Faculty</th>
			<th>Status</th>
		</tr>`;
		document.querySelector('#tbody').innerHTML = '';
		let i = 0;
		val.forEach(std => {
			i++;
			document.querySelector('#tbody').innerHTML += 
			`<tr>
				<td>${i}</td>
				<td>${std.matric_no}</td>
				<td>${std.first_name}</td>
				<td>${std.last_name}</td>
				<td>${std.sex}</td>
				<td>${std.Department}</td>
				<td>${std.Faculty}</td>
				<td>${std.Status}</td>
			</tr>`;
		});
    })
    .catch(err => console.log(err))
}

function searchStdIn() {
    let token = getCookie('token');
    let dept = getCookie('dept');
    if(!token){
        window.location.replace("../../index.html");
    }
    fetch('http://159.65.185.132:8888/smartentry/deptmentstudent', {
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
			dept_id : dept.toUpperCase(),
            token : token
        })
    })
	.then(res => res.json())
    .then(data => {
        // Declare variables
        let input = document.getElementById('search');
        let filter = input.value.toUpperCase();
        const dat = data.student_list;
        // Loop through all the visitors, and show the ones that match
        const val = dat.filter(std => ((std.matric_no.toUpperCase().indexOf(filter) > -1) || (std.first_name.toUpperCase().indexOf(filter) > -1) || (std.last_name.toUpperCase().indexOf(filter) > -1) || (std.sex.toUpperCase().indexOf(filter) > -1) || (std.Department.toUpperCase().indexOf(filter) > -1) || (std.Faculty.toUpperCase().indexOf(filter) > -1) || (std.Status.toUpperCase().indexOf(filter) > -1)));

        document.querySelector('#thead').innerHTML = 
		`<tr>
			<th>S/N</th>
			<th>Matric No.</th>
			<th>FirstName</th>
			<th>LastName</th>
			<th>Sex</th>
			<th>Department</th>
			<th>Faculty</th>
			<th>Parent Email</th>
			<th>Status</th>
		</tr>`;
		document.querySelector('#tbody').innerHTML = '';
		let i = 0;
		val.forEach(std => {
			if(std.Status === 'present'){
				i++;
				document.querySelector('#tbody').innerHTML += 
				`<tr>
				<td>${i}</td>
				<td>${std.matric_no}</td>
				<td>${std.first_name}</td>
				<td>${std.last_name}</td>
				<td>${std.sex}</td>
				<td>${std.Department}</td>
				<td>${std.Faculty}</td>
				<td>${std.parent_email}</td>
				<td>${std.Status}</td>
			</tr>`;
			}
		});
    })
    .catch(err => console.log(err))
}

function searchStdOut() {
    let token = getCookie('token');
    let dept = getCookie('dept');
    if(!token){
        window.location.replace("../../index.html");
    }
    fetch('http://159.65.185.132:8888/smartentry/deptmentstudent', {
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
			dept_id : dept.toUpperCase(),
            token : token
        })
    })
	.then(res => res.json())
    .then(data => {
        // Declare variables
        let input = document.getElementById('search');
        let filter = input.value.toUpperCase();
        const dat = data.student_list;
        // Loop through all the visitors, and show the ones that match
        const val = dat.filter(std => ((std.matric_no.toUpperCase().indexOf(filter) > -1) || (std.first_name.toUpperCase().indexOf(filter) > -1) || (std.last_name.toUpperCase().indexOf(filter) > -1) || (std.sex.toUpperCase().indexOf(filter) > -1) || (std.Department.toUpperCase().indexOf(filter) > -1) || (std.Faculty.toUpperCase().indexOf(filter) > -1) || (std.Status.toUpperCase().indexOf(filter) > -1)));

        document.querySelector('#thead').innerHTML = 
		`<tr>
			<th>S/N</th>
			<th>Matric No.</th>
			<th>FirstName</th>
			<th>LastName</th>
			<th>Sex</th>
			<th>Department</th>
			<th>Faculty</th>
			<th>Parent Email</th>
			<th>Status</th>
		</tr>`;
		document.querySelector('#tbody').innerHTML = '';
		let i = 0;
		val.forEach(std => {
			if(std.Status === 'absent'){
				i++;
				document.querySelector('#tbody').innerHTML += 
				`<tr>
				<td>${i}</td>
				<td>${std.matric_no}</td>
				<td>${std.first_name}</td>
				<td>${std.last_name}</td>
				<td>${std.sex}</td>
				<td>${std.Department}</td>
				<td>${std.Faculty}</td>
				<td>${std.parent_email}</td>
				<td>${std.Status}</td>
			</tr>`;
			}
		});
    })
    .catch(err => console.log(err))
}