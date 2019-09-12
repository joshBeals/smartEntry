
const LoadDashboard = () => {
	document.querySelector('#copy').style.display = 'none';
	fetch(`dashboard.html`)
	.then(res => res.text())
	.then(data => {
		document.querySelector('#appBody').innerHTML = data;
		numberAnalysis();
	})
	.catch(err => console.log(err));
}

const LoadTable = (firstLink, secondLink) => {
	let token = getCookie('token');
    if(!token){
        window.location.replace("../../index.html");
	}
	document.querySelector('#appBody').innerHTML = '';
	document.querySelector('#main-name').innerHTML = secondLink;
	document.querySelector('#first-link').innerHTML = firstLink;
	document.querySelector('#second-link').innerHTML = secondLink;
	document.querySelector('#copy').style.display = 'block';
	if(secondLink == 'View All Students'){
		viewStudents();
	}else if(secondLink == 'Students Present'){
		StudentsPresent();
	}else if(secondLink == 'Students Absent'){
		StudentsAbsent();
	}
}

const numberAnalysis = () => {
	let token = getCookie('token');
	let dept = getCookie('dept');
    if(!token){
        window.location.replace("../../index.html");
	}
	document.querySelector('#welcome').innerHTML = `Welcome Back, ${dept}`;
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
		document.querySelector('#totalstudents').innerHTML = data.student_list.length;
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
			let i = 0;
			data.student_list.forEach(std => {
				if(std.Status === 'present'){
					i++;
					document.querySelector('#studentspresent').innerHTML = i;
				}
			})
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
				let i = 0;
				data.student_list.forEach(std => {
					if(std.Status === 'absent'){
						i++;
						document.querySelector('#studentsabsent').innerHTML = i;
					}
				})
			})
			.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
	})
	.catch(err => console.log(err));
}

const viewStudents = () => {
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
		document.querySelector('#table').innerHTML = `<h4 class="card-title">Table</h4><br>
		<input onkeyup="searchStudents()" class="form-control" type="text" placeholder="Search..." id="search">`;
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
		data.student_list.forEach(std => {
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
		})
	})
	.catch(err => console.log(err))
}

const StudentsPresent = () => {
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
		document.querySelector('#table').innerHTML = `<h4 class="card-title">Table</h4><br>
		<input onkeyup="searchStdIn()" class="form-control" type="text" placeholder="Search..." id="search">`;
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
		data.student_list.forEach(std => {
			i++;
			if(std.Status === 'present'){
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

const StudentsAbsent = () => {
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
		document.querySelector('#table').innerHTML = `<h4 class="card-title">Table</h4><br>
		<input onkeyup="searchStdOut()" class="form-control" type="text" placeholder="Search..." id="search">`;
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
		data.student_list.forEach(std => {
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

const logout = () => {
	setCookie("user", '', 1);
	setCookie("fac", '', 1);
	setCookie("dept", '', 1);
	setCookie("token", '', 1);
	window.location.replace("../../index.html");
}

// function to set cookie
function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// get or read cookie
function getCookie(cname){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' '){
            c = c.substring(1);
        }
 
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

