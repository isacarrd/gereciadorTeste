import axios from "axios";
import { useEffect, useState } from "react";

export default function GetApi() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data); // recebe os dados
        setLoading(false); // para o loading
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      })
      .finally(() => {
        console.log("Requisição finalizada");
      });
  }, []);


  return (
    <>
      <h1>Hello World 🌏!</h1>
      <p>Testando o uso do useEffect para APIs [fazendo uso do Axios].</p>
      <div className="divMain">
        {loading ? (
          <span> Carregando...</span>
        ) : (
          users.map((user) => (
            <div className="divCard">
              <div className="titleCard">
                <label>
                  <strong>User:</strong>
                </label>
                <span key={user.id}> {user.name} </span>
              </div>
              <div>
                <span>
                  <strong>E-mail: </strong>
                  {user.email}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
