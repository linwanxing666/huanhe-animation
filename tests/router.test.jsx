import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useRoutes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { routes } from "../src/router.jsx";

function renderRoute(path) {
  function TestRoutes() {
    return useRoutes(routes);
  }

  return render(
    <MemoryRouter initialEntries={[path]}>
      <TestRoutes />
    </MemoryRouter>,
  );
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

  it("站内切换路由时复用同一个背景视频节点", async () => {
    renderRoute("/不存在");
    const originalVideo = screen.getByTestId("background-video");

    fireEvent.click(screen.getByRole("link", { name: "返回首页" }));

    expect(screen.getByTestId("background-video")).toBe(originalVideo);
    expect(originalVideo).toHaveAttribute(
      "src",
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4",
    );
  });
});
