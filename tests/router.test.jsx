import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { routes } from "../src/router.jsx";

function renderRoute(path) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return render(<RouterProvider router={router} />);
}

describe("页面路由", () => {
  it.each([
    ["/", "让想象，"],
    ["/services", "服务"],
    ["/cases", "案例视频"],
    ["/contact", "联系我们"],
  ])("%s 能渲染对应页面", (path, heading) => {
    renderRoute(path);
    expect(screen.getByText(heading, { exact: false })).toBeInTheDocument();
  });

  it("未知地址显示中文返回入口", () => {
    renderRoute("/不存在");
    expect(screen.getByRole("heading", { name: "页面未找到" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "返回首页" })).toHaveAttribute("href", "/");
  });
});
