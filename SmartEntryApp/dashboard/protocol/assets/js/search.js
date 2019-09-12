function searchStudents() {
    let token = getCookie('token');
    if(!token){
        window.location.replace("../../index.html");
    }
    fetch(`http://159.65.185.132:8888/smartentry/allstudent/${token}`)
	.then(res => res.json())
    .then(data => {
        // Declare variables
        let input = document.getElementById('search');
        let filter = input.value.toUpperCase();
        const dat = data;
        // console.log(dat);
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


function searchStdSignIn() {
    let token = getCookie('token');
    if(!token){
        window.location.replace("../../index.html");
    }
    fetch(`http://159.65.185.132:8888/smartentry/allstudent/${token}`)
	.then(res => res.json())
    .then(data => {
        // Declare variables
        let input = document.getElementById('search');
        let filter = input.value.toUpperCase();
        const dat = data;
        // console.log(dat);
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
					<td><div class="btn btn-primary btn-sm" onclick="updateStatus(0,'${std.matric_no}')">SignOut</div></td>
				</tr>`;
			}
		});
    })
    .catch(err => console.log(err))
}


function searchStdSignOut() {
    let token = getCookie('token');
    if(!token){
        window.location.replace("../../index.html");
    }
    fetch(`http://159.65.185.132:8888/smartentry/allstudent/${token}`)
	.then(res => res.json())
    .then(data => {
        // Declare variables
        let input = document.getElementById('search');
        let filter = input.value.toUpperCase();
        const dat = data;
        // console.log(dat);
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
					<td><div class="btn btn-primary btn-sm" onclick="updateStatus(0,'${std.matric_no}')">SignOut</div></td>
				</tr>`;
			}
		});
    })
    .catch(err => console.log(err))
}

function searchVisitors() {
    let token = getCookie('token');
    if(!token){
        window.location.replace("../../index.html");
    }
    fetch(`http://159.65.185.132:8888/smartentry/allvisitors/${token}`)
	.then(res => res.json())
    .then(data => {
        // Declare variables
        let input = document.getElementById('search');
        let filter = input.value.toUpperCase();
        const dat = data;
        // console.log(dat);
        // Loop through all the visitors, and show the ones that match
        const val = data.filter(visitor => ((visitor.firstName.toUpperCase().indexOf(filter) > -1) || (visitor.lastName.toUpperCase().indexOf(filter) > -1) || (visitor.email.toUpperCase().indexOf(filter) > -1) || (visitor.mobile.toUpperCase().indexOf(filter) > -1) || (visitor.address.toUpperCase().indexOf(filter) > -1) || (visitor.Who_to_meet.toUpperCase().indexOf(filter) > -1) || (visitor.Reason_for_meet.toUpperCase().indexOf(filter) > -1)));

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
		val.forEach(visitor => {
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

function searchVisOut() {
    let token = getCookie('token');
    if(!token){
        window.location.replace("../../index.html");
    }
    fetch(`http://159.65.185.132:8888/smartentry/allvisitors/${token}`)
	.then(res => res.json())
    .then(data => {
        // Declare variables
        let input = document.getElementById('search');
        let filter = input.value.toUpperCase();
        const dat = data;
        // console.log(dat);
        // Loop through all the visitors, and show the ones that match
        const val = dat.filter(visitor => ((visitor.firstName.toUpperCase().indexOf(filter) > -1) || (visitor.lastName.toUpperCase().indexOf(filter) > -1) || (visitor.email.toUpperCase().indexOf(filter) > -1) || (visitor.mobile.toUpperCase().indexOf(filter) > -1) || (visitor.address.toUpperCase().indexOf(filter) > -1) || (visitor.Who_to_meet.toUpperCase().indexOf(filter) > -1) || (visitor.Reason_for_meet.toUpperCase().indexOf(filter) > -1)));

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
		val.forEach(visitor => {
			if(visitor.time_out == 'Not yet' || visitor.time_out == ' Not yet'){
				id++
				document.querySelector('#tbody').innerHTML += 
				`<tr>
					<td>${id}</td>
					<td>${visitor.firstName}</td>
					<td>${visitor.lastName}</td>
					<td>${visitor.email}</td>
					<td>${visitor.mobile}</td>
					<td>${visitor.address}</td>
					<td>${visitor.Who_to_meet}</td>
					<td>${visitor.Reason_for_meet}</td>
					<td>${visitor.time_in}</td>
					<td><div class="btn btn-primary btn-sm" onclick="visitorOut('${visitor.mobile}')">SignOut</div></td>
				</tr>`;
			}
		});
    })
    .catch(err => console.log(err))
}



