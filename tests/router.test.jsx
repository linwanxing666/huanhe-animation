import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, useRoutes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
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
    expect(screen.getByRole("heading", { name: new RegExp(heading) })).toBeInTheDocument();
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

  it("首页保留现有结构和关键文案", () => {
    const { container } = renderRoute("/");
    expect(container.querySelector("main.hero#home")).toBeInTheDocument();
    expect(container.querySelector(".trust-row.anim#capabilities")).toBeInTheDocument();
    expect(container.querySelector("footer.stats#proof")).toBeInTheDocument();
    expect(screen.getByText("短剧与广告一体化制作")).toBeInTheDocument();
    expect(screen.getByText("人工智能短剧制作")).toBeInTheDocument();
    expect(screen.getByText("广告商单制作")).toBeInTheDocument();
    expect(screen.getByText("项目交付")).toBeInTheDocument();
    expect(screen.getByText("题材覆盖")).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/[A-Za-z]{2,}/);
  });

  it("联系页只显示二维码占位，不包含虚构二维码图片", () => {
    const { container } = renderRoute("/contact");
    expect(screen.getByText("二维码位置")).toBeInTheDocument();
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  it("减少动态效果时首页数字直接显示最终值", () => {
    vi.stubGlobal("matchMedia", () => ({
      matches: true,
      addEventListener() {},
      removeEventListener() {},
    }));

    renderRoute("/");

    expect(screen.getByText("120")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("桌面导航使用站内路由并标记当前页", () => {
    renderRoute("/");
    const desktopNav = screen.getByRole("navigation", { name: "主导航" });
    const services = within(desktopNav).getByRole("link", { name: "服务" });

    expect(services).toHaveAttribute("href", "/services");
    fireEvent.click(services);

    expect(screen.getByRole("heading", { name: "服务" })).toBeInTheDocument();
    expect(services).toHaveClass("active");
    expect(screen.getByRole("link", { name: "幻核动漫首页" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "洽谈合作" })).toHaveAttribute("href", "/contact");
  });

  it("移动菜单在路由切换后关闭", () => {
    renderRoute("/");
    const toggle = screen.getByRole("button", { name: "打开导航菜单" });
    fireEvent.click(toggle);
    const mobileNav = screen.getByRole("navigation", { name: "移动导航" });

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(within(mobileNav).getByRole("link", { name: "案例" }));

    expect(screen.getByRole("heading", { name: "案例视频" })).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("移动菜单支持退出键关闭", () => {
    renderRoute("/");
    const toggle = screen.getByRole("button", { name: "打开导航菜单" });
    fireEvent.click(toggle);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
