import { render } from "@testing-library/react";
import type { ReactNode } from "react";

import SiteLayout from "@/app/(site)/layout";

/** Renders a page inside the shared site layout (announcement bar, navbar, main, footer). */
export function renderPage(page: ReactNode) {
  return render(<SiteLayout>{page}</SiteLayout>);
}
