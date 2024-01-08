import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Offcanvas from "react-bootstrap/esm/Offcanvas.js";
import { GiHamburgerMenu } from "react-icons/gi/index.js";
import { GoBellFill } from "react-icons/go/index.js";
import { FaSearch } from "react-icons/fa/index.js";
import "../../styles/style.css";

const Homepage = () => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const navigate = useNavigate();
	const userId = useParams().userId;

	return (
		<>
			<div className="container-fluid d-flex align-items-center justify-content-between fixed-top mt-2">
				<div className="d-flex align-items-center align-items-center">
					<GiHamburgerMenu
						onClick={handleShow}
						className="fs-1  me-3"
						style={{ cursor: "pointer" }}
					/>
					<h1 className="m-0">Logo</h1>
				</div>

				<div className="row justify-content-end align-items-center">
					<div className="col-1 me-2">
						<GoBellFill className="fs-3 " style={{ cursor: "pointer" }} />
					</div>
					<div className="col-sm-10 col-8">
						<div className="border rounded-2 border-secondary d-flex align-items-center py-1 px-1">
							<input
								type="text"
								className="w-100"
								style={{ border: "none", outline: "none" }}
							/>
							<FaSearch />
						</div>
					</div>
				</div>
			</div>

			<Offcanvas
				show={show}
				onHide={handleClose}
				style={{ minWidth: "170px", width: "20%" }}
			>
				<Offcanvas.Header>
					<GiHamburgerMenu
						onClick={handleClose}
						className="fs-1"
						style={{ cursor: "pointer" }}
					/>
					<h1 className="m-0">Logo</h1>
				</Offcanvas.Header>
				<Offcanvas.Body className="list-group p-0 rounded-0 sidebar">
					<li
						className="list-group-item active border-0 py-3"
						aria-current="true"
					>
						Home
					</li>
					<li
						className="list-group-item border-0 py-3"
						onClick={() => navigate(`/profile/${userId}`)}
					>
						Profile
					</li>
					<li className="list-group-item border-0 py-3">Group</li>
					<li className="list-group-item border-0 py-3">Campus Condition</li>
					<li className="list-group-item border-0 py-3">Friend</li>
					<li className="list-group-item border-0 py-3">Marketplace</li>
					<li className="list-group-item border-0 py-3">Setting</li>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default Homepage;
