import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, useRoutes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { CasesPage } from "../src/pages/CasesPage.jsx";
import { routes } from "../src/router.jsx";

const configuredCase = {
  id: "sample-one",
  title: "测试短剧",
  category: "人工智能短剧",
  summary: "用于验证站内播放行为的测试作品。",
  videoSrc: "https://example.com/sample.mp4",
  posterSrc: "https://example.com/poster.jpg",
};

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
    ["/services", "从创意到成片"],
    ["/cases", "每一帧，都为传播服务"],
    ["/contact", "开启下一次创作"],
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
    expect(screen.getByText("二维码待上传")).toBeInTheDocument();
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  it("服务页清晰呈现两项核心业务与制作流程", () => {
    renderRoute("/services");

    expect(screen.getByRole("heading", { name: "从创意到成片" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "人工智能短剧制作" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "广告商单制作" })).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "合作流程" })).toHaveTextContent("需求沟通");
    expect(screen.getByRole("list", { name: "合作流程" })).toHaveTextContent("成片交付");
  });

  it("案例页不虚构作品并提供获取样片入口", () => {
    renderRoute("/cases");

    expect(screen.getByRole("heading", { name: "每一帧，都为传播服务" })).toBeInTheDocument();
    expect(screen.getByText("精选项目即将呈现")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "联系获取样片" })).toHaveAttribute("href", "/contact");
  });

  it("配置作品后显示封面与站内播放入口而不是视频外链", () => {
    const { container } = render(
      <MemoryRouter>
        <CasesPage items={[configuredCase]} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "测试短剧" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "测试短剧封面" })).toHaveAttribute(
      "src",
      "https://example.com/poster.jpg",
    );
    expect(screen.getByRole("button", { name: "播放测试短剧" })).toBeInTheDocument();
    expect(container.querySelector('a[href="https://example.com/sample.mp4"]')).not.toBeInTheDocument();
  });

  it("点击作品后直接在当前页面加载视频播放器", () => {
    const { container } = render(
      <MemoryRouter>
        <CasesPage items={[configuredCase]} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "播放测试短剧" }));

    const video = container.querySelector("video");
    expect(video).toHaveAttribute("src", "https://example.com/sample.mp4");
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("autoplay");
    expect(screen.getByRole("button", { name: "收起测试短剧" })).toBeInTheDocument();
  });

  it("联系页说明合作准备信息并保留真实二维码位置", () => {
    renderRoute("/contact");

    expect(screen.getByRole("heading", { name: "开启下一次创作" })).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "合作前请准备" })).toHaveTextContent("项目类型");
    expect(screen.getByRole("list", { name: "合作前请准备" })).toHaveTextContent("交付时间");
    expect(screen.getByText("二维码待上传")).toBeInTheDocument();
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

    expect(screen.getByRole("heading", { name: "从创意到成片" })).toBeInTheDocument();
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

    expect(screen.getByRole("heading", { name: "每一帧，都为传播服务" })).toBeInTheDocument();
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
