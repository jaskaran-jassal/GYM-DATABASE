const express = require('express');
const path = require('path');
const database = require('./database');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

app.post('/employeeSignIn', (req, res) => {
    const { empUsername, empPassword } = req.body;

    const selectQuery = 'SELECT * FROM employees WHERE username = ? AND password = ?';
    database.query(selectQuery, [empUsername, empPassword], (err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Error querying database' });
            console.error(err);
        } else {
            if (rows.length === 0) {
                // Username and/or password don't match
                res.status(401).json({ message: 'Invalid username or password' });
            } else {
                // Username and password match
                res.status(200).json({ success: true }); // Sending success flag
            }
        }
    });
});

app.post('/ownerSignin', (req, res) => {
    const { username, password } = req.body;
    const selectQuery = 'SELECT * FROM owner WHERE username = ? AND password = ?';
    database.query(selectQuery, [username, password], (err, rows) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ message: 'Error querying database' });
        } else {
            console.log('Rows:', rows);
            if (rows.length === 0) {
                res.status(401).json({ message: 'Invalid username or password' });
            } else {
                res.status(200).json({ success: true });
            }
        }
    });
});

app.post('/memberSignIn', (req, res) => {
    const { memberUsername, memberPassword } = req.body;
    const selectQuery = 'SELECT * FROM members WHERE username = ? AND password = ?';
    database.query(selectQuery, [memberUsername, memberPassword], (err, rows) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ message: 'Error querying database' });
        } else {
            console.log('Rows:', rows);
            if (rows.length === 0) {
                res.status(401).json({ message: 'Invalid username or password' });
            } else {
                res.status(200).json({ success: true });
            }
        }
    });
});

app.post('/newMember', (req, res) => {
    const { username, password, membershipPlan, locker, paymentOption } = req.body;
    const insertQuery = 'INSERT INTO members (username, password, membership_plan, locker, payment_option) VALUES (?, ?, ?, ?, ?)';

    database.query(insertQuery, [username, password, membershipPlan, locker, paymentOption], (err, result) => {
        if (err) {
            console.error('Error inserting into database:', err);
            res.status(500).json({ message: 'Error inserting into database' });
        } else {
            console.log('Inserted:', result);
            res.status(200).json({ success: true });
        }
    });
});

app.post('/memberDashboard', (req, res) => {
    const { username, currentPassword, newPassword } = req.body;
    const updateQuery = 'UPDATE members SET password = ? WHERE username = ? AND password = ?';

    database.query(updateQuery, [newPassword, username, currentPassword], (err, result) => {
        if (err) {
            console.error('Error updating database:', err);
            res.status(500).json({ message: 'Error updating database' });
        } else {
            if (result.affectedRows > 0) {
                console.log('Password updated successfully');
                res.status(200).json({ success: true });
            } else {
                console.log('Username and/or current password did not match any record');
                res.status(400).json({ success: false, message: 'Invalid username or current password' });
            }
        }
    });
});

app.post('/selectedSession', (req, res) => {
    const { member_name,selectedSession } = req.body;

    const updateQuery = 'UPDATE members SET session = ? WHERE username = ?';

    database.query(updateQuery, [selectedSession, member_name], (err, result) => {
        if (err) {
            console.error('Error updating database:', err);
            res.status(500).json({ message: 'Error updating database' });
        } else {
            if (result.affectedRows > 0) {
                console.log('Added Successfully');
                res.status(200).json({ success: true });
            } else {
                console.log('Unsuccesfull');
                res.status(400).json({ success: false, message: 'Unsuccesfull' });
            }
        }
    });
});

app.post('/editOwnerInfo', (req, res) => {
    const { username, currentPassword, newPassword } = req.body;
    const updateQuery = 'UPDATE owner SET password = ? WHERE username = ? AND password = ?';

    database.query(updateQuery, [newPassword, username, currentPassword], (err, result) => {
        if (err) {
            console.error('Error updating database:', err);
            res.status(500).json({ message: 'Error updating database' });
        } else {
            if (result.affectedRows > 0) {
                console.log('Password updated successfully');
                res.status(200).json({ success: true });
            } else {
                console.log('Username and/or current password did not match any record');
                res.status(400).json({ success: false, message: 'Invalid username or current password' });
            }
        }
    });
});


app.post('/addTrainer', (req, res) => {
    const { trainerUsername, trainerPassword} = req.body;
    const insertQuery = 'INSERT INTO employees (username, password) VALUES (?, ?)';

    database.query(insertQuery, [trainerUsername, trainerPassword], (err, result) => {
        if (err) {
            console.error('Error inserting into database:', err);
            res.status(500).json({ message: 'Error inserting into database' });
        } else {
            console.log('Inserted:', result);
            res.status(200).json({ success: true });
        }
    });
});

app.post('/removeTrainer', (req, res) => {
    const { removeTrainerUsername } = req.body;
    const deleteQuery = 'DELETE FROM employees WHERE username = ?';

    database.query(deleteQuery, [removeTrainerUsername], (err, result) => {
        if (err) {
            console.error('Error deleting from database:', err);
            res.status(500).json({ message: 'Error deleting from database' });
        } else {
            if (result.affectedRows > 0) {
                console.log('Deleted:', result);
                res.status(200).json({ success: true });
            } else {
                res.status(404).json({ message: 'Trainer not found' });
            }
        }
    });
});
app.post('/updatePlan', (req, res) => {
    const { username, newPlan } = req.body;
    const updateQuery = 'UPDATE members SET membership_plan = ? WHERE username = ?';

    database.query(updateQuery, [newPlan, username], (err, result) => {
        if (err) {
            console.error('Error updating database:', err);
            res.status(500).json({ success: false, message: 'Error updating database' });
        } else {
            if (result.affectedRows > 0) {
                console.log('Plan updated successfully');
                res.status(200).json({ success: true, message: 'Plan updated successfully' });
            } else {
                console.log('Username did not match any record');
                res.status(400).json({ success: false, message: 'Invalid username' });
            }
        }
    });
});
app.post('/getCurrentPlan', (req, res) => {
    const { username } = req.body;
    const selectQuery = 'SELECT membership_plan FROM members WHERE username = ?';

    database.query(selectQuery, [username], (err, rows) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ success: false, message: 'Error querying database' });
        } else {
            if (rows.length > 0) {
                const currentPlan = rows[0].membership_plan;
                res.status(200).json({ success: true, currentPlan });
            } else {
                res.status(400).json({ success: false, message: 'User not found or plan not available' });
            }
        }
    });
});
app.post('/cancelMembership', (req, res) => {
    const { username } = req.body;
    const updateQuery = 'UPDATE members SET membership_plan = NULL WHERE username = ?';

    database.query(updateQuery, [username], (err, result) => {
        if (err) {
            console.error('Error updating database:', err);
            res.status(500).json({ success: false, message: 'Error updating database' });
        } else {
            if (result.affectedRows > 0) {
                console.log('Membership canceled for username:', username);
                res.status(200).json({ success: true, message: 'Membership canceled successfully' });
            } else {
                res.status(404).json({ success: false, message: 'Member not found' });
            }
        }
    });
});
app.post('/markAttendance', (req, res) => {
    const { username } = req.body;

    const insertQuery = 'UPDATE members SET attendance = true WHERE username = ?';

    database.query(insertQuery, [username], (err, result) => {
        if (err) {
            console.error('Error updating attendance:', err);
            res.status(500).json({ success: false, message: 'Error updating attendance' });
        } else {
            console.log('Attendance marked successfully');
            res.status(200).json({ success: true, message: 'Attendance marked successfully' });
        }
    });
});

app.post('/submitMaintenance', (req, res) => {
    const { equipment, equipmentId } = req.body;

    const insertQuery = 'INSERT INTO equipment_maintenance (equipment, equipment_id) VALUES (?, ?)';

    database.query(insertQuery, [equipment, equipmentId], (err, result) => {
        if (err) {
            console.error('Error submitting maintenance:', err);
            res.status(500).json({ success: false, message: 'Error submitting maintenance request' });
        } else {
            console.log(`Maintenance request submitted for ${equipment} with ID ${equipmentId}`);
            res.status(200).json({ success: true, message: 'Maintenance request submitted successfully' });
        }
    });
});
app.post('/updateEmployeeInfo', (req, res) => {
    const { username, currentPassword, newPassword, newSession } = req.body;

    // Check if the current password matches
    const selectQuery = 'SELECT * FROM employees WHERE username = ? AND password = ?';
    database.query(selectQuery, [username, currentPassword], (err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Error querying database' });
            console.error(err);
        } else {
            if (rows.length === 0) {
                // Current password doesn't match
                res.status(401).json({ message: 'Invalid current password' });
            } else {
                // Update the employee's password and session
                const updateQuery = 'UPDATE employees SET password = ?, session = ? WHERE username = ?';
                database.query(updateQuery, [newPassword, newSession, username], (err, result) => {
                    if (err) {
                        res.status(500).json({ message: 'Error updating employee information' });
                        console.error(err);
                    } else {
                        if (result.affectedRows > 0) {
                            res.status(200).json({ success: true, message: 'Employee information updated successfully' });
                        } else {
                            res.status(400).json({ success: false, message: 'Invalid username' });
                        }
                    }
                });
            }
        }
    });
});
app.post('/selectedSessionemp', (req, res) => {
    const { empUsername,selectedSession } = req.body;

    const updateQuery = 'UPDATE employees SET session = ? WHERE username = ?';

    database.query(updateQuery, [selectedSession, empUsername], (err, result) => {
        if (err) {
            console.error('Error updating database:', err);
            res.status(500).json({ message: 'Error updating database' });
        } else {
            if (result.affectedRows > 0) {
                console.log('Added Successfully');
                res.status(200).json({ success: true });
            } else {
                console.log('Unsuccesfull');
                res.status(400).json({ success: false, message: 'Unsuccesfull' });
            }
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
