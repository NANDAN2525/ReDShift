import { useState } from "react";
import {
  Box,
  OutlinedInput,
  InputLabel,
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import "./Details.css";
import roles from "./roles";
import { toast } from "react-toastify";

const Details = ({ row, defempid, onSave, onCancel, setSelectedRows }) => {
  const currentDate = new Date();
  // Calculate the maximum selectable date (current date - 20 years)
  const maxDate = new Date(
    currentDate.getFullYear() - 20,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const maxjoinDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 20
  );
  const minexitDate = new Date(
    currentDate.getFullYear() - 5,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  console.log(minexitDate);
  // Function to check if a string contains only alphabets
  const isAlphabetsOnly = (str) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(str);
  };

  // Function to validate the first name
  const validateFirstName = (value) => {
    const isValid = isAlphabetsOnly(value) && value.length >= 1;
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      firstNameError: !isValid,
    }));
  };

  const validatelastName = (value) => {
    const isValid = isAlphabetsOnly(value) && value.length >= 1;
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      lastNameError: !isValid,
    }));
  };

  const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isValid =
      regex.test(value) && value.length >= 20 && value.length <= 40;
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      emailError: !isValid,
    }));
  };

  function convertDateToTimestamp(dateString) {
    const [year, month, day] = dateString.split("-");
    const timestamp = new Date(year, month - 1, day).getTime();
    return timestamp;
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    return formattedDate;
  }

  const [data, setdata] = useState({
    ...row,
    dob: formatDate(row.dob),
    orginalDob: formatDate(row.orginalDob),
    joiningDate: formatDate(row.joiningDate),
    exitDate: formatDate(row.exitDate),
  });

  const [validationErrors, setValidationErrors] = useState({
    firstNameError: false,
    lastNameError: false,
    emailError: false,
  });

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogAction, setConfirmDialogAction] = useState(null);

  const handleConfirmDialogOpen = (action) => {
    setConfirmDialogOpen(true);
    setConfirmDialogAction(action);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
    setConfirmDialogAction(null);
  };

  const handleSave = () => {
    onSave({
      ...data,
      dob: convertDateToTimestamp(data.dob),
      orginalDob: convertDateToTimestamp(data.orginalDob),
      joiningDate: convertDateToTimestamp(data.joiningDate),
      exitDate:
        data.status === "DeActive"
          ? convertDateToTimestamp(
              data.exitDate === "1970-01-01"
                ? formatDate(minexitDate)
                : data.exitDate
            )
          : "",
    });
    handleConfirmDialogClose();
  };

  const handleCancel = () => {
    handleConfirmDialogOpen("cancel");
  };

  const handleCanceldialog = () => {
    handleCancel();
    setdata({
      ...row,
      dob: formatDate(row.dob),
      orginalDob: formatDate(row.orginalDob),
      joiningDate: formatDate(row.joiningDate),
      exitDate: formatDate(row.exitDate),
    });
    handleConfirmDialogClose();
    onCancel();
    setSelectedRows([]);
    toast.success(
      "Changes canceled successfully for the employee! " + data.employeeId,
      {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "custom-toast-body", // Custom className for toast body
        style: {
          fontFamily: "sans-serif, Helvetica", // Custom font family
          fontSize: "9px", // Custom font size
        },
        theme: "light",
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !validationErrors.firstNameError &&
      !validationErrors.emailError &&
      !validationErrors.lastNameError
    ) {
      handleConfirmDialogOpen("save");
    }
  };

  return (
    <div className="details_comp">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ overflow: "hidden", p: 2 }}
      >
        <Typography variant="h6" gutterBottom>
          {row.firstName === ""
            ? "Create Employee Details"
            : "Edit Employee Details"}
        </Typography>

        {row.firstName === "" && (
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="EmployeeId">Employee-Id</InputLabel>
            <OutlinedInput
              id="EmployeeId"
              value={data.employeeId}
              required
              placeholder={`Enter the employee id  ${defempid}`}
              onChange={(e) => setdata({ ...data, employeeId: e.target.value })}
              fullWidth
            />
          </Grid>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="first-name">First Name</InputLabel>
            <OutlinedInput
              id="first-name"
              value={data.firstName}
              required
              onChange={(e) => {
                setdata({ ...data, firstName: e.target.value });
                validateFirstName(e.target.value);
              }}
              fullWidth
              disabled={row.firstName === "" ? false : true}
            />
            {validationErrors.firstNameError && (
              <Typography variant="caption" color="error">
                First name should contain only alphabets and have a minimum
                length of 1.
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="last-name">Last Name</InputLabel>
            <OutlinedInput
              id="last-name"
              value={data.lastName}
              required
              onChange={(e) => {
                setdata({ ...data, lastName: e.target.value });
                validatelastName(e.target.value);
              }}
              fullWidth
              disabled={row.firstName === "" ? false : true}
            />
            {validationErrors.lastNameError && (
              <Typography variant="caption" color="error">
                Last name should contain only alphabets and have a minimum
                length of 1.
              </Typography>
            )}
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="Designation">Designation</InputLabel>
            <Select
              id="Designation"
              required
              value={data.designation}
              onChange={(e) =>
                setdata({ ...data, designation: e.target.value })
              }
              fullWidth
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="Date of Joining">Date of Joining</InputLabel>
            <OutlinedInput
              id="Date of Joining"
              required
              value={data.joiningDate}
              type="date"
              onChange={(e) =>
                setdata({ ...data, joiningDate: e.target.value })
              }
              fullWidth
              inputProps={{
                max: formatDate(maxjoinDate),
                disabled:
                  row.firstName === ""
                    ? data.orginalDob
                      ? false
                      : new Date(data.orginalDob) > maxDate
                    : true,
              }}
              disabled={row.firstName === "" ? false : true}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="Date of Birth">Date of Birth</InputLabel>
            <OutlinedInput
              id="Date of Birth"
              required
              value={data.dob.toString()}
              type="date"
              onChange={(e) => setdata({ ...data, dob: e.target.value })}
              inputProps={{
                max: formatDate(maxDate),
                disabled:
                  row.firstName === ""
                    ? data.orginalDob
                      ? false
                      : new Date(data.orginalDob) > maxDate
                    : true,
              }}
              fullWidth
              disabled={row.firstName === "" ? false : true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="Original Date of Birth">
              Original Date of Birth
            </InputLabel>
            <OutlinedInput
              id="Original Date of Birth"
              required
              value={data.orginalDob.toString()}
              type="date"
              onChange={(e) => setdata({ ...data, orginalDob: e.target.value })}
              inputProps={{
                max: formatDate(maxDate),
                disabled:
                  row.firstName === ""
                    ? data.orginalDob
                      ? false
                      : new Date(data.orginalDob) > maxDate
                    : true,
              }}
              fullWidth
              disabled={row.firstName === "" ? false : true}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <Select
              id="gender"
              value={data.gender}
              required
              onChange={(e) => setdata({ ...data, gender: e.target.value })}
              fullWidth
              disabled={row.firstName === "" ? false : true}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="Status">Status</InputLabel>
            <Select
              id="Status"
              value={data.status}
              required
              onChange={(e) => setdata({ ...data, status: e.target.value })}
              fullWidth
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="DeActive">DeActive</MenuItem>
            </Select>
          </Grid>
        </Grid>
        {data.status === "DeActive" && row.firstName !== "" && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor="Date of Exit">Date of Exit</InputLabel>
              <OutlinedInput
                id="Date of Exit"
                required
                value={
                  data.exitDate === "1970-01-01"
                    ? formatDate(minexitDate)
                    : data.exitDate
                }
                type="date"
                onChange={(e) => setdata({ ...data, exitDate: e.target.value })}
                fullWidth
                inputProps={{
                  min: formatDate(minexitDate),
                }}
              />
            </Grid>
          </Grid>
        )}
        <Grid item xs={12}>
          <InputLabel htmlFor="Email_ID">Email_ID</InputLabel>
          <OutlinedInput
            id="Email_ID"
            required
            value={data.emailId}
            type="email"
            onChange={(e) => {
              setdata({ ...data, emailId: e.target.value });
              validateEmail(e.target.value);
            }}
            fullWidth
            disabled={row.firstName === "" ? false : true}
          />
          {validationErrors.emailError && (
            <Typography variant="caption" color="error">
              Email should have a minimum length of 20 and contain only
              alphabets, numbers, '@', '.', '-', and '_'.
            </Typography>
          )}
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          margin={4}
          columnGap={2}
          display={"flex"}
          justifyContent={"center"}
        >
          <Button type="submit" variant="contained">
            Save
          </Button>
          <Button onClick={handleCancel} color="error" variant="contained">
            Cancel
          </Button>
        </Grid>
      </Box>
      <Dialog
        open={confirmDialogOpen}
        onClose={handleConfirmDialogClose}
        maxWidth="xs"
      >
        <DialogTitle>
          {confirmDialogAction === "save" ? "Save Changes?" : "Cancel Changes?"}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to{" "}
            {confirmDialogAction === "save" ? "save" : "cancel"} the changes?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose} color="primary">
            No
          </Button>
          <Button
            onClick={
              confirmDialogAction === "save" ? handleSave : handleCanceldialog
            }
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Details;
