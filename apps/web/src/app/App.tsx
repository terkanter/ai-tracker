import { Dashboard } from "@/resources/dashboard";
import { EditGuesser } from "@workspace/admin/edit-guesser";
import { ListGuesser } from "@workspace/admin/list-guesser";
import { ShowGuesser } from "@workspace/admin/show-guesser";
import {
  BookOutline,
  ChartSquareOutline,
  ChatLineOutline,
  CrownMinimalisticOutline,
  LightbulbBoltOutline,
} from "@workspace/icons/solar";
import { Resource } from "ra-core";
import { authProvider } from "./authProvider";
import { Admin } from "./core/admin";
import { dataProvider } from "./dataProvider";

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      dashboard={Dashboard}
      authProvider={authProvider}
    >
      <Resource
        options={{ label: "Prompts" }}
        name="products"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        icon={ChatLineOutline}
        // icon={HomeOutline}
        recordRepresentation="reference"
      />
      <Resource
        options={{ label: "Competitors" }}
        name="categories"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        icon={CrownMinimalisticOutline}
        recordRepresentation="name"
      />
      <Resource
        options={{ label: "Top Pages" }}
        name="users"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        recordRepresentation="reference"
        // icon={DocumentTextOutline}
        icon={ChartSquareOutline}
      />
      <Resource
        options={{ label: "Articles" }}
        name="customers"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        recordRepresentation="reference"
        icon={BookOutline}
      />

      <Resource
        options={{ label: "Recommendations" }}
        name="orders"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        recordRepresentation="reference"
        icon={LightbulbBoltOutline}
      />
    </Admin>
  );
}

export default App;
