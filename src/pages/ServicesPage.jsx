import { useState } from "react";
import { Link } from "react-router-dom";

const services = [
  {
    id: "short-drama",
    mark: "剧",
    title: "人工智能短剧制作",
    description: "覆盖剧本开发、角色设定、镜头生成、声音设计与后期包装，让创意更快形成完整叙事。",
    tags: ["剧本开发", "角色设定", "镜头生成"],
    contactLabel: "沟通短剧项目",
    steps: [
      ["需求与题材定位", "明确目标受众、发布平台、内容篇幅与交付方向。"],
      ["剧本策划", "完成故事梗概、分集结构、人物关系与台词打磨。"],
      ["角色视觉定稿", "锁定人物形象、场景氛围、画面风格与关键参考。"],
      ["镜头声音制作", "推进分镜画面、人物表演、配音、音乐与音效制作。"],
      ["剪辑审核交付", "完成剪辑包装，根据确认意见修改并输出最终成片。"],
    ],
  },
  {
    id: "advertising",
    mark: "商",
    title: "广告商单制作",
    description: "围绕品牌目标定制内容表达，从创意提案到成片交付，兼顾视觉质感与传播效率。",
    tags: ["创意提案", "品牌视觉", "成片交付"],
    contactLabel: "沟通广告项目",
    steps: [
      ["品牌目标沟通", "明确产品卖点、核心受众、投放平台与成片时长。"],
      ["创意方案确认", "输出传播主题、脚本方向、内容形式与视觉基调。"],
      ["分镜素材准备", "确认分镜、角色、场景以及品牌素材的使用规范。"],
      ["影像后期制作", "完成画面制作、剪辑、配音、音乐、音效与视觉包装。"],
      ["多规格成片交付", "根据约定输出横版、竖版及不同平台所需尺寸文件。"],
    ],
  },
];

const businessScope = [
  "人工智能短剧",
  "仿真人影像",
  "二维动漫",
  "三维动漫",
  "游戏广告",
  "商业广告",
  "文旅影像",
];

export function ServicesPage() {
  const [activeService, setActiveService] = useState(null);

  return (
    <main className="route-page route-services">
      <div className="route-shell">
        <header className="route-intro">
          <p className="route-kicker"><span aria-hidden="true" />服务能力</p>
          <h1>从创意到成片</h1>
          <p>以人工智能拓展内容生产边界，以成熟制作流程守住作品质感。</p>
        </header>

        <section className="about-panel" aria-labelledby="about-title">
          <div className="about-copy">
            <p className="about-eyebrow"><span aria-hidden="true" />公司简介</p>
            <h2 id="about-title">关于幻核动漫</h2>
            <div className="about-text">
              <p>
                幻核动漫是一家专注于人工智能影像创作与数字内容制作的创新型动漫公司。我们以人工智能技术为核心，融合影视创意、动画制作与商业传播，为客户提供从创意策划、剧本开发、角色与场景设计，到影像生成、声音制作、后期剪辑及成片交付的一体化服务。
              </p>
              <p>
                公司业务涵盖人工智能短剧制作、仿真人影像、二维动漫、三维动漫、游戏广告、商业广告及文旅影像等领域。我们能够根据不同项目需求，定制真人风格短剧、动漫短剧、品牌宣传片、产品广告、游戏推广内容以及城市与景区文旅影像，帮助客户以更高效、更具表现力的方式完成内容创作与品牌传播。
              </p>
              <p>
                幻核动漫坚持以创意为核心、以技术为驱动，在不断探索数字影像新形式的同时，注重故事表达、视觉品质与商业价值的统一。我们期待与品牌、企业、游戏厂商、文旅机构及内容创作者携手合作，共同打造更具想象力和传播力的影像作品。
              </p>
            </div>
          </div>

          <aside className="business-scope" aria-label="业务范围一览">
            <div className="scope-heading">
              <span>业务范围</span>
              <small>七项核心能力</small>
            </div>
            <ul aria-label="业务范围">
              {businessScope.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item}</strong>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="service-grid" aria-label="核心服务">
          {services.map((service) => {
            const isOpen = activeService === service.id;
            const panelId = `${service.id}-workflow`;

            return (
              <article className={`service-card${isOpen ? " is-open" : ""}`} key={service.title}>
                <div className="service-card-top">
                  <span className="service-mark" aria-hidden="true">{service.mark}</span>
                  <span className="service-arrow" aria-hidden="true">{isOpen ? "−" : "＋"}</span>
                </div>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <div className="service-tags" aria-label={`${service.title}环节`}>
                  {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>

                <button
                  className="service-flow-toggle"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  aria-label={`${isOpen ? "收起" : "查看"}${service.title}流程`}
                  onClick={() => setActiveService(isOpen ? null : service.id)}
                >
                  <span>{isOpen ? "收起制作流程" : "查看制作流程"}</span>
                  <span aria-hidden="true">{isOpen ? "向上" : "向下"}</span>
                </button>

                {isOpen && (
                  <section
                    className="service-workflow"
                    id={panelId}
                    role="region"
                    aria-label={`${service.title}工作流程`}
                  >
                    <div className="service-workflow-heading">
                      <strong>项目如何推进</strong>
                      <span>五个阶段</span>
                    </div>
                    <ol aria-label={`${service.title}流程阶段`}>
                      {service.steps.map(([title, detail], index) => (
                        <li key={title}>
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <div>
                            <strong>{title}</strong>
                            <p>{detail}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <Link className="service-workflow-contact" to="/contact">
                      {service.contactLabel}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </section>
                )}
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
