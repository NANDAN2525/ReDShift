import React, { useEffect, useState, useCallback } from "react";
import "./Content.css";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Details from "../details/Details";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";

const Content = ({ openEmployess }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [allRows, setAllRows] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogAction, setConfirmDialogAction] = useState(null);

  const updateAllRows = useCallback(() => {
    fetch("http://localhost:8021/api/employee/get/all")
      .then((res) => res.json())
      .then((data) => {
        setAllRows(data);
        console.log("data:");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    updateAllRows();
  }, [updateAllRows]);

  const handleRowSelection = (params) => {
    const selectedIds = params.map((employeeId) => employeeId.toString());
    const selectedRows = allRows.filter((row) =>
      selectedIds.includes(row.employeeId.toString())
    );
    setSelectedRows(selectedRows);
  };

  const handleCreate = () => {
    handleConfirmDialogOpen("create");
  };

  const handleEdit = () => {
    handleConfirmDialogOpen("edit");
  };

  const handleSave = useCallback(
    (updatedRow) => {
      console.log("updatedRow");
      console.log(updatedRow);
      fetch(
        `http://localhost:8021/api/employee/update/${updatedRow.employeeId}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedRow),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            console.log(res);
            toast.success("Updated Successfully " + updatedRow.employeeId, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              bodyClassName: "custom-toast-body", // Custom className for toast body
              style: {
                fontFamily: "sans-serif", // Custom font family
                fontSize: "14px", // Custom font size
              },
              theme: "light",
            });
            updateAllRows();
          } else {
            throw new Error(
              `Failed to update employee record. Status code: ${res.status}`
            );
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to update employee record", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: "custom-toast-body", // Custom className for toast body
            style: {
              fontFamily: "sans-serif", // Custom font family
              fontSize: "14px", // Custom font size
            },
            theme: "light",
          });
        })
        .finally(() => {
          setEditingRow(null);
          setSelectedRows([]);
        });
    },
    [updateAllRows]
  );

  const handleCreateemp = useCallback(
    (updatedRow) => {
      console.log("updatedRow");
      console.log(updatedRow);
      fetch(`http://localhost:8021/api/employee/add`, {
        method: "POST",
        body: JSON.stringify(updatedRow),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            console.log(res);
            toast.success("Created Successfully  " + updatedRow.employeeId, {
              position: "bottom-left",
              autoClose: 3000,
              fontFamily: "sans-serif",
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              bodyClassName: "custom-toast-body", // Custom className for toast body
              style: {
                fontFamily: "sans-serif", // Custom font family
                fontSize: "14px", // Custom font size
              },
              theme: "light",
            });
            updateAllRows();
          } else {
            throw new Error(
              `Failed to Create employee record. Status code: ${res.status}`
            );
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to create employee record", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            bodyClassName: "custom-toast-body", // Custom className for toast body
            style: {
              fontFamily: "sans-serif,helvetica", // Custom font family
              fontSize: "14px", // Custom font size
            },
            theme: "light",
          });
        })
        .finally(() => {
          setEditingRow(null);
          setSelectedRows([]);
        });
    },
    [updateAllRows]
  );

  const handleCancel = () => {
    setEditingRow(null);
  };

  const handleConfirmDialogOpen = (action) => {
    setConfirmDialogOpen(true);
    setConfirmDialogAction(action);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
    setConfirmDialogAction(null);
  };

  const maxEmployeeid = () => {
    let eids = allRows.map((roww) => roww.employeeId);
    console.log(eids.sort()[eids.length - 1]);
    return eids.sort()[eids.length - 1];
  };

  const defempid =
    allRows.length !== 0
      ? maxEmployeeid().substring(0, 3) +
        Number(Number(maxEmployeeid().substring(3)) + 1)
      : "E00" + Number(Math.floor(Math.random() * 90) + 10);
  console.log("defempid");
  console.log(defempid);

  const handleConfirmDialogAction = () => {
    if (confirmDialogAction === "create") {
      createNewRow();
    } else if (confirmDialogAction === "edit") {
      editSelectedRow();
    }
    handleConfirmDialogClose();
  };

  const createNewRow = () => {
    setEditingRow({
      // id: Math.floor(Math.random() * 90) + 10,
      // id: maxid(),
      employeeId: "",
      firstName: "",
      lastName: "",
      gender: "Male",
      status: "Active",
      joiningDate: "",
      designation: "",
      dob: "",
      orginalDob: "",
      emailId: "",
      exitDate: "",
    });
  };

  const editSelectedRow = () => {
    setEditingRow(selectedRows[0]);
  };

  return (
    <div className="compcontent_layout">
      {openEmployess ? (
        editingRow ? (
          <Details
            row={editingRow}
            onSave={editingRow.firstName ? handleSave : handleCreateemp}
            onCancel={handleCancel}
            setSelectedRows={setSelectedRows}
            defempid={defempid}
          />
        ) : (
          <>
            <h1 className="compcontent_title">Employees</h1>
            <div className="compcontent_buttons">
              {selectedRows.length === 0 && (
                <>
                  <p>
                    <strong>Total Employees : {allRows.length}</strong>
                  </p>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleCreate}
                  >
                    Create
                  </Button>
                </>
              )}
              {selectedRows.length === 1 && (
                <>
                  <p>
                    <strong>Total Employees : {allRows.length}</strong>
                  </p>
                  <Button variant="contained" onClick={handleEdit}>
                    Edit
                  </Button>
                </>
              )}
            </div>
            <div
              className="compcontent_table"
              style={{ height: "100%", width: "100%" }}
            >
              <DataGrid
                rows={allRows}
                columns={[
                  { field: "employeeId", headerName: "EmployeeId" },
                  { field: "firstName", headerName: "First name" },
                  { field: "lastName", headerName: "Last name" },
                  { field: "gender", headerName: "Gender" },
                  {
                    field: "fullName",
                    headerName: "Full name",
                    description:
                      "This column has a value getter and is not sortable.",
                    sortable: false,
                    valueGetter: (params) =>
                      `${params.row.firstName || ""} ${
                        params.row.lastName || ""
                      }`,
                  },
                  { field: "status", headerName: "Status" },
                  {
                    field: "designation",
                    headerName: "Designation",
                    flex: 1,
                    minWidth: 150,
                  },
                ]}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 20]}
                autoHeight
                checkboxSelection
                getRowId={(row) => row.employeeId}
                onRowSelectionModelChange={handleRowSelection}
              />
            </div>
            <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
              <DialogTitle>
                Confirm{" "}
                {confirmDialogAction === "delete" ? "Deletion" : "Action"}
              </DialogTitle>
              <DialogContent>
                {confirmDialogAction === "delete" ? (
                  <p>Are you sure you want to delete the selected row(s)?</p>
                ) : (
                  <p>
                    Are you sure you want to {confirmDialogAction}{" "}
                    {confirmDialogAction === "create"
                      ? "the Employee"
                      : "the row?"}
                  </p>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleConfirmDialogClose}>Cancel</Button>
                <Button onClick={handleConfirmDialogAction} autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )
      ) : (
        <>
          <Typography margin="auto" variant="h4" align="center">
            Welcome to the Employee Management
          </Typography>
          <ReactPlayer
            url="https://video.twimg.com/ext_tw_video/1663570130821939203/pu/vid/640x360/rWiF5tNprYCCUOfH.mp4?tag=12"
            controls={true}
            width="100%"
            height="100%"
            loop={true}
          />
        </>
      )}
    </div>
  );
};
export default Content;
