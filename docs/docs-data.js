/* ==========================================================================
   DS CUSTOMS — docs registry
   This is the ONLY file you edit to make a new doc page appear on the docs
   homepage. The homepage (index.html) never changes.

   To add a new resource's documentation:
     1. Copy the /docs/_template folder, rename it to your resource's id
        (e.g. /docs/livery-manager).
     2. Edit that folder's index.html with your content.
     3. Add one entry to the DOCS array below — "id" must match the folder
        name exactly, since it's used to build the link.
   That's it. No other file needs to change.
   ========================================================================== */

const DOCS = [
  {
    id: "vehicle-customs",       // folder name under /docs
    title: "Vehicle Customs",
    summary: "Install, configure, and set permissions for the paint, wrap, and performance menu.",
    tag: "Script",
    version: "v2.3.0"
  }

  // Example of a new entry once you've created /docs/livery-manager/index.html:
  // {
  //   id: "livery-manager",
  //   title: "Livery Manager",
  //   summary: "Upload liveries, map them to models, and preview them in-game.",
  //   tag: "Script",
  //   version: "v1.0.0"
  // },
];
