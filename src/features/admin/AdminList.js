import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import swal from "sweetalert";

import {
	asyncAdminByName,
	asyncAllAdmins,
	asyncDeleteAdmin,
} from "./adminServices";

const AdminList = (props) => {
	const {data, hasNext} = useSelector((state) => state.admin);
	// console.log(data);

	const [term, setTerm] = useState("");
	const [pageNumber, setPageNumber] = useState(0);

	const dispatch = useDispatch();

	useEffect(() => {
		if (hasNext) {
			dispatch(asyncAllAdmins(pageNumber));
		}
	}, [dispatch, pageNumber, hasNext]);

	const fetchData = () => {
		if (hasNext) {
			setPageNumber(pageNumber + 1);
			asyncAllAdmins(pageNumber);
		} else {
			setPageNumber(0);
			asyncAllAdmins(pageNumber);
		}
	};

	const handleRemove = (id) => {
		// console.log(id)
		swal({
			title: "Are you sure?",
			text: "Do you want to delete this admin data?",
			icon: "warning",
			buttons: [true, "Yes"],
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				dispatch(asyncDeleteAdmin(id));
				swal("Customer Deleted Successfully!", "", {
					icon: "success",
				});
			} else {
				swal("Customer data is safe!", "", "info");
			}
		});
	};

	const handleChange = (e) => {
		const res = e.target.value;
		setTerm(res);
		dispatch(asyncAdminByName(res.toLowerCase()));
	};

	return (
		<div className="mt-2">
			<Link to="/dashboard" className="m-3">
				Back
			</Link>
			<Link to="/dashboard/admin/create" className="m-3">
				Create Admin
			</Link>
			<div className="card-body">
				<h4>Admin List</h4>
				<input
					type="text"
					placeholder="Search by full name..."
					value={term}
					onChange={handleChange}
					className="form-control"
					style={{width: "25rem"}}
				/>
			</div>
			<div className="container">
				<InfiniteScroll
					dataLength={data.length}
					next={fetchData}
					hasMore={hasNext}
					loader={<p className="lead text-center">Loading records...</p>}
					endMessage={
						<p className="lead text-center">No more records...</p>
					}
				>
					{data.map((ele) => {
						return (
							<div
								className="container card bg-primary bg-opacity-25 mt-2"
								key={ele.id}
							>
								<h5>
									<Link
										to={`/dashboard/admin/id/${ele.id}`}
										className="nav nav-link text-dark text-center"
									>
										{ele.firstName} {ele.lastName}
									</Link>
								</h5>
								<div className="d-flex justify-content-between mb-2">
									<Link to={`/dashboard/admin/edit/${ele.id}`}>
										<button className="btn btn-sm btn-success">
											Edit
										</button>
									</Link>
									<button
										onClick={() => {
											handleRemove(ele.id);
										}}
										className="btn btn-sm btn-danger"
									>
										Remove
									</button>
								</div>
							</div>
						);
					})}
				</InfiniteScroll>
			</div>
		</div>
	);
};

export default AdminList;
