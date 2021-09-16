import React from "react";

function Loader() {
	return (
		<div role="status" aria-live="polite" aria-label="loading">
			<div className="shapes-1"></div>
		</div>
	);
}

export default Loader;
