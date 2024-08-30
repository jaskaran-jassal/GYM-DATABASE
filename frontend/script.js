function signIn(userType) {
    switch (userType) {
        case 'owner':
            window.location.href = 'ownerSignIn.html';
            break;
        case 'employee':
            window.location.href = 'employeeSignIn.html';
            break;
        case 'member':
            window.location.href = 'memberSignIn.html';
            break;

        case 'newmember':
            window.location.href = 'newMember.html';
            break;
        case 'memberPlans':
            window.location.href = 'membershipPlans.html';
            break;
        default:
            break;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const employeeSignInForm = document.getElementById('employeeSignInForm');

    if (employeeSignInForm) {
        employeeSignInForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const empUsername = document.getElementById('empUsername').value;
            const empPassword = document.getElementById('empPassword').value;
            localStorage.setItem('empUsername', empUsername);

            try {
                const response = await fetch('/employeeSignIn', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ empUsername, empPassword })
                });

                const result = await response.json();

                if (result.success) {
                    document.getElementById('employeeSignInForm').reset();
                    window.location.href = `employeeDashboard.html?username=${empUsername}`;

                } else {

                    window.alert("Your credentials does not matches our record ");
                    document.getElementById('employeeSignInForm').reset();
                    console.log('Unsuccessful');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    } else {
        console.log('Employee sign-in form not found.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const ownerSignInForm = document.getElementById('ownerSignInForm');

    if (ownerSignInForm) {
        ownerSignInForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/ownerSignin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const result = await response.json();

                if (result.success) {
                    document.getElementById('ownerSignInForm').reset();
                    window.location.href = `ownerDashboard.html?username=${username}`;

                } else {
                    window.alert("Your credentials does not matches our record ");
                    document.getElementById('ownerSignInForm').reset();
                    console.log('Unsuccessful');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    } else {
        console.log('Owner sign-in form not found.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const memberSignInForm = document.getElementById('memberSignInForm');

    if (memberSignInForm) {
        memberSignInForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const memberUsername = document.getElementById('memberUsername').value;
            const memberPassword = document.getElementById('memberPassword').value;

            try {
                const response = await fetch('/memberSignIn', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ memberUsername, memberPassword })
                });

                const result = await response.json();

                if (result.success) {
                    localStorage.setItem('username', memberUsername);
                    document.getElementById('memberSignInForm').reset();
                    localStorage.setItem('attendance_mark', '0');
                    window.location.href = 'memberDashboard.html';
                } else {
                    document.getElementById('memberSignInForm').reset();
                    window.alert("Your credentials do not match our records.");
                    console.log('Unsuccessful');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    } else {
        console.log('Member sign-in form not found.');
    }
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        document.getElementById('member_name').textContent = storedUsername;
    }
});

document.addEventListener('DOMContentLoaded', () => {

    const availableLockers = ['locker1', 'locker2', 'locker3', 'locker4', 'locker5'];

    const newMember = document.getElementById('newMember');

    if (newMember) {
        newMember.addEventListener('submit', async (event) => {
            event.preventDefault();

            var username = document.getElementById('usernameInput').value;
            var password = document.getElementById('passwordInput').value;
            var membershipPlan = document.getElementById('membershipPlanSelect').value;
            var locker = document.getElementById('lockerSelect').value;

            var paymentOption;
            if (document.getElementById('paymentCardRadio').checked) {
                paymentOption = document.getElementById('paymentCardRadio').value;
            } else if (document.getElementById('paymentCashRadio').checked) {
                paymentOption = document.getElementById('paymentCashRadio').value;
            }

            if (availableLockers.includes(locker)) {
                try {
                    const response = await fetch('/newMember', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username, password, membershipPlan, locker, paymentOption })
                    });

                    const result = await response.json();

                    if (result.success) {
                        const index = availableLockers.indexOf(locker);
                        if (index !== -1) {
                            availableLockers.splice(index, 1);
                        }
                        window.alert("Registration Successful");
                        document.getElementById('newMember').reset();
                    } else {
                        window.alert("User Name Has Already been taken");
                        document.getElementById('newMember').reset();
                        console.log('Unsuccessful');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                window.alert("Locker already chosen. Please select a different locker.");
            }
        });
    } else {
        console.log('Member sign-in form not found.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const editInfoForm = document.getElementById('editInfoForm');

    if (editInfoForm) {
        editInfoForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;

            try {
                const response = await fetch('/memberDashboard', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, currentPassword, newPassword })
                });

                const result = await response.json();

                if (result.success) {
                    window.alert("Credentials Changed Successfully");
                    document.getElementById('editInfoForm').reset();
                } else {

                    document.getElementById('editInfoForm').reset();
                    console.log('Unsuccessful');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    } else {
        console.log('Member dashboard form not found.');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const selectSessionForm = document.getElementById('selectSessionForm');

    if (selectSessionForm) {
        selectSessionForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const selectedSession = document.getElementById('session').value;
            const member_name = localStorage.getItem('username');

            try {
                const response = await fetch('/selectedSession', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ member_name, selectedSession })
                });

                const result = await response.json();

                if (result.success) {
                    window.alert("Session Picked Successfully");
                    document.getElementById('selectSessionForm').value = selectedSession;
                } else {

                    console.log('Unsuccessful');
                    document.getElementById('selectSessionForm').reset();
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    } else {
        console.log('Member dashboard form not found.');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const edit_user_settings_form = document.getElementById('edit_user_settings_form');

    if (edit_user_settings_form) {
        edit_user_settings_form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = document.getElementById('edit_username').value;
            const currentPassword = document.getElementById('current_password').value;
            const newPassword = document.getElementById('new_password').value;

            try {
                const response = await fetch('/editOwnerInfo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, currentPassword, newPassword })
                });

                const result = await response.json();

                if (result.success) {
                    window.alert("Credentials Changed Successfully")
                    document.getElementById('edit_user_settings_form').reset();
                } else {
                    console.log('Unsuccessful');
                    document.getElementById('edit_user_settings_form').reset();
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    } else {
        console.log('Owner dashboard form not found.');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const add_trainer_form = document.getElementById('add_trainer_form');

    if (add_trainer_form) {
        add_trainer_form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const trainerUsername = document.getElementById('trainer_username').value;
            const trainerPassword = document.getElementById('trainer_password').value;

            try {
                const response = await fetch('/addTrainer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ trainerUsername, trainerPassword })
                });

                const result = await response.json();

                if (result.success) {
                    window.alert("Trainer Added Successfully");
                    document.getElementById('add_trainer_form').reset();
                } else {

                    window.alert("User name has already been taken ");
                    document.getElementById('add_trainer_form').reset();
                    console.log('Unsuccessful');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    } else {
        console.log('Owner dashboard form not found.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const remove_trainer_form = document.getElementById('remove_trainer_form');

    if (remove_trainer_form) {
        remove_trainer_form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const removeTrainerUsername = document.getElementById('remove_trainer_username').value;
            try {
                const response = await fetch('/removeTrainer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ removeTrainerUsername })
                });

                const result = await response.json();

                if (result.success) {
                    window.alert("Trainer Removed Successfully")
                    document.getElementById('remove_trainer_form').reset();
                } else {
                    console.log('Unsuccessful');
                    document.getElementById('remove_trainer_form').reset();
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    } else {
        console.log('Owner dashboard form not found.');
    }
});

function updatePlan() {
    const newPlanSelect = document.getElementById('newPlan');
    const newPlan = newPlanSelect.value;
    const paymentCardRadio = document.getElementById('paymentCardRadio');
    const paymentCashRadio = document.getElementById('paymentCashRadio');
    const paymentOptionSelected = paymentCardRadio.checked || paymentCashRadio.checked;

    if (newPlan && paymentOptionSelected) {
        const memberUsername = localStorage.getItem('username');

        console.log('Sending request to update plan:', { username: memberUsername, newPlan });

        fetch('/updatePlan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: memberUsername, newPlan })
        })
            .then(response => response.json())
            .then(result => {
                console.log('Received response:', result);

                if (result.success) {
                    window.alert(result.message);
                } else {
                    window.alert('Failed to update plan. ' + result.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.alert('An error occurred. Please try again later. If the issue persists, contact support.');
            });
    } else {
        window.alert('Please select a new plan and a payment option.');
    }
}

function displayCurrentPlan() {
    const memberUsername = localStorage.getItem('username');

    fetch('/getCurrentPlan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: memberUsername })
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                window.alert(`Your current plan is: ${result.currentPlan}`);
            } else {
                window.alert('Failed to retrieve current plan. ' + result.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.alert('An error occurred. Please try again later. If the issue persists, contact support.');
        });
}
function cancelMembership() {

    const currentPlan = localStorage.getItem('currentPlan');
    console.log(currentPlan);

    if (currentPlan != 'null') {
        const memberUsername = localStorage.getItem('username');

        fetch('/cancelMembership', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: memberUsername })
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    window.alert('Membership canceled successfully');
                    localStorage.setItem('currentPlan', 'null'); // Set 'currentPlan' to null
                } else {
                    window.alert(`Failed to cancel membership. Error: ${result.message}`);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.alert('An error occurred during the fetch operation. Please check the console for details.');
            });
    } else {
        window.alert("You are not enrolled in any plan right now");
    }
}

function markAttendance() {
    const memberUsername = localStorage.getItem('username');
    let attendanceMark = localStorage.getItem('attendance_mark');

    if (attendanceMark == '0') {
        fetch('/markAttendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: memberUsername })
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    window.alert(`Attendance marked successfully for ${memberUsername}`);
                    localStorage.setItem('attendance_mark', '1');
                } else {
                    window.alert(`Failed to mark attendance. Error: ${result.message}`);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.alert('An error occurred. Please try again later. If the issue persists, contact support.');
            });
    } else if (attendanceMark == '1') {
        alert("You have already been marked present for the day");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ownerUsernameSpan = document.getElementById('owner_username');
    const equipmentMaintenanceForm = document.getElementById('equipment_maintenance_form');

    if (equipmentMaintenanceForm) {

        const urlParams = new URLSearchParams(window.location.search);
        const ownerUsername = urlParams.get('username');

        if (ownerUsernameSpan && ownerUsername) {
            ownerUsernameSpan.textContent = ownerUsername;
        }
        equipmentMaintenanceForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const equipment = document.getElementById('equipment').value;
            const equipmentId = parseInt(document.getElementById('equipmentId').value);

            fetch('/submitMaintenance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ equipment, equipmentId }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    if (data.success) {
                        document.getElementById('equipment').value = '';
                        document.getElementById('equipmentId').value = '';
                        window.alert('item sent for maintainance');

                    } else {
                        window.alert("failed to sent ,some other item with that id already exists!!");
                        document.getElementById('equipment').value = '';
                        document.getElementById('equipmentId').value = '';
                    }

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    }
    else {
        console.log('form not found.');
    }
}
);

document.addEventListener('DOMContentLoaded', () => {
    const employeeUsernameSpan = document.getElementById('employee_username');

    const urlParams = new URLSearchParams(window.location.search);
    const employeeUsername = urlParams.get('username');

    if (employeeUsernameSpan && employeeUsername) {
        employeeUsernameSpan.textContent = employeeUsername;
    }
});

function editEmployeeInfo() {
    const employeeUsername = document.getElementById('username').value;
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;

    if (!employeeUsername || !currentPassword || !newPassword) {
        alert('Please provide all required information.');
        return;
    }

    fetch('/updateEmployeeInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: employeeUsername,
            currentPassword,
            newPassword
        })
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Employee information updated successfully.');
                document.getElementById('username').value = '';
                document.getElementById('currentPassword').value = '';
                document.getElementById('newPassword').value = '';

            } else {
                alert('Failed to update employee information');
                document.getElementById('username').value = '';
                document.getElementById('currentPassword').value = '';
                document.getElementById('newPassword').value = '';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
}
function updatedSessionInfo() {
    const selectedSession = document.getElementById('session').value;
    const employee_name = localStorage.getItem('empUsername');
    fetch('/selectedSessionemp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            selectedSession: selectedSession,
            empUsername: employee_name,

        }),
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                window.alert('Session saved successfully');
            } else {
                window.alert(`Failed to save session. Error: ${result.message}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.alert('An error occurred. Please try again later. If the issue persists, contact support.');
        });
}
