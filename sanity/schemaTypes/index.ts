import { type SchemaTypeDefinition } from "sanity";
import { pageType } from "./page";
import { releaseType } from "./release";
import { contactType } from "./contact";
import { showType } from "./show";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pageType, releaseType, contactType, showType],
};
