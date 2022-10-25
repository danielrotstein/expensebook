import { useGetAccountsQuery } from './store/accountsApi';


function AccountList() {
  const { data, isLoading } = useGetAccountsQuery();


  if (isLoading) {
    return (
      <progress className="progress is-primary" max="100"></progress>
    );
  }


  return (
    <div className="columns is-centered">
      <div className="column is-narrow">
        <table className="table is-striped">
          <thead>
            <tr>
              <th>first_name</th>
              <th>last_name</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {data.accounts.map(account => (
              <tr key={account.id}>
                <td>
                  {account.first_name}
                  {account.last_name}
                </td>
                <td>
                  {account.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default AccountList;