import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="route-page">
      <h1>页面未找到</h1>
      <Link to="/">返回首页</Link>
    </main>
  );
}
