import { EditGuesser } from "@workspace/admin/edit-guesser";
import { ListGuesser } from "@workspace/admin/list-guesser";
import { ShowGuesser } from "@workspace/admin/show-guesser";
import { Resource } from "ra-core";
import { authProvider } from "./authProvider";
import { Admin } from "./core/admin";
import { dataProvider } from "./dataProvider";

function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource
        name="products"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        recordRepresentation="reference"
      />
      <Resource
        name="categories"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        recordRepresentation="name"
      />
    </Admin>
  );
}

export default App;
