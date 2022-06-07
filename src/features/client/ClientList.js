import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import swal from "sweetalert";
import InfiniteScroll from "react-infinite-scroll-component";

import {
	asyncAllClients,
	asyncDeleteClient,
	asyncClientByName,
} from "./clientSlice";

const ClientList = (props) => {
	const {data,  hasNext} = useSelector((state) => state.client);
	// console.log(data);

	const [term, setTerm] = useState("");
	const [pageNumber, setPageNumber] = useState(0);

	const dispatch = useDispatch();

	useEffect(() => {
		if(hasNext){
			dispatch(asyncAllClients(pageNumber));
		}
	}, [dispatch, pageNumber, hasNext]);

	const fetchData = () => {
		if (hasNext) {
			setPageNumber(pageNumber + 1);
			asyncAllClients(pageNumber);
		} else{
			setPageNumber(0)
			asyncAllClients(pageNumber)
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
				dispatch(asyncDeleteClient(id));
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
		dispatch(asyncClientByName(res.toLowerCase()));
	};

	return (
		<div className="mt-2">
			<Link to="/dashboard" className="m-3">
				Back
			</Link>
			<Link to="/dashboard/client/create" className="m-3">
				Create Client
			</Link>
			<div className="card-body">
				<h4>Client List</h4>
				<input
					type="text"
					placeholder="Search by full name..."
					value={term}
					onChange={handleChange}
					className="form-control mb-3"
					style={{width: "25rem"}}
				/>
			</div>
			<div className="container">
				<InfiniteScroll
					dataLength={data.length}
					next={fetchData}
					hasMore={hasNext}
					loader={<p className="lead text-center">Loading data...</p>}
					endMessage={
						<p className="lead text-center">No more records...</p>
					}
				>
					{data.map((ele) => {
						return (
							<div
								key={ele.id}
								className="container card bg-primary bg-opacity-25 mt-2"
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
									<Link to={`/dashboard/client/edit/${ele.id}`}>
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

export default ClientList;
