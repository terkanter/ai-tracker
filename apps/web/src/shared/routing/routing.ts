import { AppRouting } from "./routes/app";
import { AuthRouting } from "./routes/auth";
import { ContentRouting } from "./routes/content";

class RoutingClass {
  // Namespace instances
  public auth = new AuthRouting();
  public app = new AppRouting();
  public content = new ContentRouting();
}

export const Routing = new RoutingClass();
