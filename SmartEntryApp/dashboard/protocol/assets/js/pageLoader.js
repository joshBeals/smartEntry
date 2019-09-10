
const LoadDashboard = () => {
	document.querySelector('#copy').style.display = 'none';
	fetch('dashboard.html')
	.then(res => res.text())
	.then(data => {
		document.querySelector('#appBody').innerHTML = data;
		numberAnalysis();
	})
	.catch(err => console.log(err));
}

const AddVisitors = () => {
	document.querySelector('#copy').style.display = 'none';
	fetch('addVisitors.html')
	.then(res => res.text())
	.then(data => {
		document.querySelector('#appBody').innerHTML = data;
	})
	.catch(err => console.log(err));
}

const LoadTable = (firstLink, secondLink) => {
	document.querySelector('#appBody').innerHTML = '';
	document.querySelector('#main-name').innerHTML = secondLink;
	document.querySelector('#first-link').innerHTML = firstLink;
	document.querySelector('#second-link').innerHTML = secondLink;
	document.querySelector('#copy').style.display = 'block';
	if(secondLink == 'Sign Students In'){
		signStudentsIn();
	}else if(secondLink == 'Sign Students Out'){
		signStudentsOut();
	}else if(secondLink == 'View All Students'){
		viewStudents();
	}else if(secondLink == 'Sign Visitors Out'){
		signVisitorsOut();
	}else if(secondLink == 'View All Visitors'){
		viewVisitors();
	}
}

const numberAnalysis = () => {
	let token = getCookie('token');
	let user = getCookie('user');
    if(!token){
        window.location.replace("../../index.html");
	}
	document.querySelector('#welcome').innerHTML = `Welcome Back, ${user}`;
	fetch(`http://159.65.185.132:8888/smartentry/protocolstatistics/${token}`)
	.then(res => res.json())
	.then(data => {
		document.querySelector('#visitorsignin').innerHTML = data.total_visitor_not_sign_out;
		document.querySelector('#visitorsignout').innerHTML = data.total_visitor_signed_out;
		document.querySelector('#studentspresent').innerHTML = data.total_student_present;
		document.querySelector('#studentsabsent').innerHTML = data.total_student_absent;
		document.querySelector('#totalvisitors').innerHTML = data.total_visitor;
		document.querySelector('#totalstudents').innerHTML = data.total_student;
	})
	.catch(err => console.log(err))
}

const signStudentsIn = () => {
	let token = getCookie('token');
    if(!token){
        window.location.replace("../../index.html");
    }
    fetch(`http://159.65.185.132:8888/smartentry/allstudent/${token}`)
	.then(res => res.json())
	.then(data => {
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
			<th>Action</th>
		</tr>`;
		document.querySelector('#tbody').innerHTML = '';
		let i = 0;
		data.forEach(std => {
			// alert(std.matric_no);
			if(std.Status == 'absent'){
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
					<td><div class="btn btn-primary btn-sm" onclick="updateStatus('1', '${std.matric_no}')">SignIn</div></td>
				</tr>`;
			}
		});
	})
	.catch(err => console.log(err))
}

const signStudentsOut = () => {
	let token = getCookie('token');
    if(!token){
        window.location.replace("../../index.html");
    }
    fetch(`http://159.65.185.132:8888/smartentry/allstudent/${token}`)
	.then(res => res.json())
	.then(data => {
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
			<th>Action</th>
		</tr>`;
		document.querySelector('#tbody').innerHTML = '';
		let i = 0;
		data.forEach(std => {
			// alert(std.matric_no);
			if(std.Status == 'present'){
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
					<td><div class="btn btn-primary btn-sm" onclick="updateStatus('0', '${std.matric_no}')">SignOut</div></td>
				</tr>`;
			}
		});
	})
	.catch(err => console.log(err))
}

const updateStatus = (id,matric) => {
	let token = getCookie('token');
    if(!token){
        window.location.replace("../../index.html");
    }
	fetch('http://159.65.185.132:8888/smartentry/updatestudentstatus', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
			student_id : matric,
			status : id,
            token : token
        })
    })
    .then(res => res.text())
    .then(data => { 
		// console.log(data);
		signStudentsOut(); signStudentsIn();
    })
    .catch(err => console.log(err))
}

const viewStudents = () => {
	let token = getCookie('token');
    if(!token){
        window.location.replace("../../index.html");
    }
    fetch(`http://159.65.185.132:8888/smartentry/allstudent/${token}`)
	.then(res => res.json())
	.then(data => {
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
		data.forEach(std => {
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

const signVisitorsOut = () => {
	let token = getCookie('token');
    if(!token){
        window.location.replace("../../index.html");
    }
    fetch(`http://159.65.185.132:8888/smartentry/allvisitors/${token}`)
	.then(res => res.json())
	.then(data => {
		document.querySelector('#thead').innerHTML = 
		`<tr>
			<th>ID</th>
			<th>FirstName</th>
			<th>LastName</th>
			<th>Email</th>
			<th>Phone</th>
			<th>Address</th>
			<th>Who to meet</th>
			<th>Reason for meeting</th>
			<th>Time In</th>
			<th>Action</th>
		</tr>`;
		document.querySelector('#tbody').innerHTML = '';
		data.forEach(visitor => {
			if(visitor.time_out === 'Not yet'){
				document.querySelector('#tbody').innerHTML += 
				`<tr>
					<td>${visitor.Id}</td>
					<td>${visitor.firstName}</td>
					<td>${visitor.lastName}</td>
					<td>${visitor.email}</td>
					<td>${visitor.mobile}</td>
					<td>${visitor.address}</td>
					<td>${visitor.Who_to_meet}</td>
					<td>${visitor.Reason_for_meet}</td>
					<td>${visitor.time_in}</td>
					<td><div class="btn btn-primary btn-sm" onclick="visitorOut('${visitor.Id}')">SignOut</div></td>
				</tr>`;
			}
		});
	})
	.catch(err => console.log(err))
}

const visitorOut = (id) => {
	let token = getCookie('token');
    if(!token){
        window.location.replace("../../index.html");
    }
	fetch('http://159.65.185.132:8888/smartentry/signoutvisitor', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
			visitor_id : id,
            token : token
        })
    })
    .then(res => res.text())
    .then(data => { 
        // console.log(data);
    })
    .catch(err => console.log(err))
}

const visitorIn = () => {
	let token = getCookie('token');
    if(!token){
        window.location.replace("../../index.html");
    }
    fetch('http://159.65.185.132:8888/smartentry/visitorrequest', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            firstName : document.querySelector('#firstname').value,
            lastName : document.querySelector('#lastname').value,
            email : document.querySelector('#email').value,
            phone : document.querySelector('#mobile').value,
            Who_to_meet : document.querySelector('#wtm').value,
            Reason_for_meet : document.querySelector('#rfm').value,
            address : document.querySelector('#address').value,
            token : token
        })
    })
    .then(res => res.text())
    .then(data => {
		// console.log(data);
	})
    .catch(err => console.log(err))
}

const viewVisitors = () => {
	let token = getCookie('token');
    if(!token){
        window.location.replace("../../index.html");
    }
    fetch(`http://159.65.185.132:8888/smartentry/allvisitors/${token}`)
	.then(res => res.json())
	.then(data => {
		document.querySelector('#thead').innerHTML = 
		`<tr>
			<th>ID</th>
			<th>FirstName</th>
			<th>LastName</th>
			<th>Email</th>
			<th>Phone</th>
			<th>Address</th>
			<th>Who to meet</th>
			<th>Reason for meeting</th>
			<th>Time In</th>
			<th>Time Out</th>
		</tr>`;
		document.querySelector('#tbody').innerHTML = '';
		data.forEach(visitor => {
			document.querySelector('#tbody').innerHTML += 
			`<tr>
				<td>${visitor.Id}</td>
				<td>${visitor.firstName}</td>
				<td>${visitor.lastName}</td>
				<td>${visitor.email}</td>
				<td>${visitor.mobile}</td>
				<td>${visitor.address}</td>
				<td>${visitor.Who_to_meet}</td>
				<td>${visitor.Reason_for_meet}</td>
				<td>${visitor.time_in}</td>
				<td>${visitor.time_out}</td>
			</tr>`;
		});
	})
	.catch(err => console.log(err))
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