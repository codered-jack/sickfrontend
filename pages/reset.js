import RequestReset from "../components/RequestReset.js";
import Reset from "../components/Reset.js";

function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <Reset token={query.token}/>
    </div>
  );
}

export default ResetPage;
