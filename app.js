const STORAGE_KEYS = {
  done: "rlk_done",
  revenue: "rlk_revenue",
  start: "rlk_start",
};

const REVENUE_TARGET = 10_000_000;
const PLAN_DAYS = 100;

const TASKS = {
  urgent: [
    { id: "u1", name: "모두의 아이디어, GLENCI 작성", sub: "강호수 명의 | 오늘 밤 21:00~22:40", deadline: "4월 15일", status: "urgent" },
    { id: "u2", name: "모두의 아이디어, 노인 카카오택시", sub: "이민정 명의 | 오늘 밤 21:00~22:40", deadline: "4월 15일", status: "urgent" },
    { id: "u3", name: "모두의 아이디어, 노인 전용 UI", sub: "강호이 명의 | 오늘 밤 21:00~22:40", deadline: "4월 15일", status: "urgent" },
    { id: "u4", name: "안양 시장 건, 전화 답변 대기", sub: "돈 받으면 즉시 착수", deadline: "오늘", status: "wait" },
    { id: "u5", name: "비디봇 설문조사 보고 + 방향 결정", sub: "강승원 오늘~내일 답변 예정", deadline: "오늘~내일", status: "wait" },
    { id: "u6", name: "알레스카 태인고모, 단가 재협의 문자 발송", sub: "이번에 받고 끝내기. 안되면 손 뗌", deadline: "오늘", status: "urgent" },
    { id: "u7", name: "규복삼촌, CI / SNS 권한 양식 카톡 발송", sub: "내가 양식 만들어서 보내기", deadline: "오늘", status: "urgent" },
  ],
  short: [
    { id: "s1", name: "규복삼촌 서브브랜드 홈페이지 개발", sub: "CI 수령 후 즉시 착수", deadline: "~30일", status: "ready" },
    { id: "s2", name: "규복삼촌 마케팅 분석 보고서", sub: "모델 프롬프트 수집 + WOW 포인트 설계", deadline: "~30일", status: "ready" },
    { id: "s3", name: "엄마 크몽 서비스 등록", sub: "서비스 항목 정리 후 등록", deadline: "~30일", status: "ready" },
    { id: "s4", name: "엄마 마케팅 자동화", sub: "크몽 등록 완료 후 진행", deadline: "~30일", status: "hold" },
    { id: "s5", name: "세무사 상담 예약", sub: "농업재단 관련 | 이번 주 목요일 전", deadline: "이번 주", status: "urgent" },
  ],
  mid: [
    { id: "m1", name: "GLENCI 홈페이지 + 프로그램 개발", sub: "규복삼촌 홈페이지 끝나고 착수", deadline: "~90일", status: "ready" },
    { id: "m2", name: "GEO 마케팅 외주 패키지 구조 설계", sub: "코세라 강의 완강 후 | 바이브코딩 학습 필요", deadline: "~60일", status: "ready" },
    { id: "m3", name: "GEO 마케팅 홈페이지 개발", sub: "개발 학습 선행 필요", deadline: "~90일", status: "hold" },
    { id: "m4", name: "N8N 학습 + 워크플로우 자동화 설계", sub: "주 3시간 학습 목표", deadline: "~60일", status: "ready" },
    { id: "m5", name: "벨조 마케팅 자동화", sub: "N8N 기본 완성 후 적용", deadline: "~90일", status: "hold" },
    { id: "m6", name: "챗봇 사업 구조화", sub: "비디봇 답변 후 방향 결정", deadline: "~60일", status: "wait" },
  ],
  long: [
    { id: "l1", name: "알레스카 홈페이지 개발", sub: "단가 재협의 완료 후만 진행", deadline: "조건부", status: "hold" },
    { id: "l2", name: "GLENCI 본격 개발", sub: "공동창업자 확정 후", deadline: "조건부", status: "hold" },
    { id: "l3", name: "농업 사업 운영", sub: "8월까지 요건 충족 필수 | 벌금 2000만원", deadline: "8월", status: "legal" },
  ],
  legal: [
    { id: "g1", name: "농업재단 사업 요건 충족 확인", sub: "포천 도소매 등록 | 세무사 확인 필요", deadline: "8월 마감", status: "legal" },
    { id: "g2", name: "형사 소송 결과 대기", sub: "결과 오면 즉시 대응 | 지금은 대기", deadline: "결과 대기", status: "wait" },
    { id: "g3", name: "지급명령 신청 건 추적", sub: "주 1회 진행 상황 확인", deadline: "진행 중", status: "wait" },
    { id: "g4", name: "세무사 상담 (농업 / 사업자)", sub: "포천 도소매 + 농업재단 통합 상담", deadline: "이번 주", status: "urgent" },
  ],
  routine: [
    { id: "r1", name: "수면 7.5~9시간", sub: "취침 12시 → 기상 9시", deadline: "매일", status: "ready" },
    { id: "r2", name: "헬스 (10:20~11:20)", sub: "Zone2 + 근력", deadline: "매일", status: "ready" },
    { id: "r3", name: "독서 (이동 중 1시간 15분)", sub: "왕복 이동시간 활용", deadline: "매일", status: "ready" },
    { id: "r4", name: "코세라 GEO 강의 1시간", sub: "매일 1강씩", deadline: "매일", status: "ready" },
    { id: "r5", name: "100일 기록 작성", sub: "오늘부터 시작 | 저녁 19:00~20:00", deadline: "매일", status: "urgent" },
    { id: "r6", name: "산책 20분 (저녁 식사 후)", sub: "스마트폰 없이 | DMN 여백 확보", deadline: "매일", status: "ready" },
  ],
  hold: [
    { id: "h1", name: "알레스카 (재협의 전)", sub: "돈 없이 시간만 나감 → 문자 후 대기", deadline: "-", status: "hold" },
    { id: "h2", name: "벨조 자동화", sub: "N8N 학습 전 착수 불가", deadline: "-", status: "hold" },
    { id: "h3", name: "비디봇 (답 오기 전)", sub: "대기 상태, 에너지 낭비 금지", deadline: "-", status: "hold" },
    { id: "h4", name: "GEO 홈페이지 개발", sub: "바이브 코딩 학습 선행 필요", deadline: "-", status: "hold" },
  ],
};

const STATUS_LABELS = {
  urgent: { label: "URGENT", className: "status-urgent" },
  wait: { label: "WAIT", className: "status-wait" },
  ready: { label: "READY", className: "status-ready" },
  hold: { label: "HOLD", className: "status-hold" },
  legal: { label: "LEGAL", className: "status-legal" },
};

let doneSet = loadJson(STORAGE_KEYS.done, []);
let revenueLog = loadJson(STORAGE_KEYS.revenue, []);
let agentHistory = [];
const startDate = getOrCreateStartDate();

document.addEventListener("DOMContentLoaded", () => {
  bindTabs();
  bindTaskGrid();
  bindRevenueForm();
  bindExport();
  bindAgent();
  initDashboard();
});

function initDashboard() {
  const now = new Date();
  const start = new Date(startDate);
  const elapsedDays = Math.max(0, Math.floor((stripTime(now) - stripTime(start)) / 86_400_000));
  const remainingDays = Math.max(0, PLAN_DAYS - elapsedDays);

  document.getElementById("todayDate").textContent = now.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });
  document.getElementById("dayCounter").textContent = `D-${remainingDays}`;
  document.getElementById("daysLeft").textContent = `D-${remainingDays} 남음`;
  document.getElementById("revenueDate").value = formatDateInput(now);

  renderTasks();
  updateProgress();
  renderRevenue();
  updateRevenueSummary(remainingDays);
}

function bindTabs() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
  });
}

function switchTab(name) {
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `panel-${name}`);
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === name);
  });
}

function bindTaskGrid() {
  document.querySelectorAll(".task-grid").forEach((container) => {
    container.addEventListener("click", (event) => {
      const button = event.target.closest(".task-item");
      if (!button) {
        return;
      }

      const { taskId } = button.dataset;
      if (!taskId) {
        return;
      }

      toggleTask(taskId);
    });
  });
}

function renderTasks() {
  Object.entries(TASKS).forEach(([section, list]) => {
    const container = document.getElementById(`tasks-${section}`);
    if (!container) {
      return;
    }

    container.innerHTML = list.map((task) => renderTaskMarkup(task)).join("");
  });
}

function renderTaskMarkup(task) {
  const isDone = doneSet.includes(task.id);
  const status = STATUS_LABELS[task.status] || STATUS_LABELS.hold;

  return `
    <button class="task-item ${isDone ? "done" : ""}" type="button" data-task-id="${task.id}" aria-pressed="${isDone}">
      <div class="task-check">${isDone ? "✓" : ""}</div>
      <div>
        <div class="task-name">${escapeHtml(task.name)}</div>
        <div class="task-sub">${escapeHtml(task.sub)}</div>
      </div>
      <div class="task-deadline">${escapeHtml(task.deadline)}</div>
      <div class="task-status ${status.className}">${status.label}</div>
    </button>
  `;
}

function toggleTask(taskId) {
  if (doneSet.includes(taskId)) {
    doneSet = doneSet.filter((id) => id !== taskId);
  } else {
    doneSet = [...doneSet, taskId];
  }

  saveJson(STORAGE_KEYS.done, doneSet);
  renderTasks();
  updateProgress();
}

function updateProgress() {
  const allIds = Object.values(TASKS).flat().map((task) => task.id);
  const total = allIds.length;
  const done = allIds.filter((id) => doneSet.includes(id)).length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  document.getElementById("doneCount").textContent = String(done);
  document.getElementById("totalCount").textContent = String(total);
  document.getElementById("progressPct").textContent = String(percent);
  document.getElementById("progressBar").style.width = `${percent}%`;
}

function bindRevenueForm() {
  document.getElementById("addRevenueBtn").addEventListener("click", addRevenue);
  document.getElementById("revenueAmount").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addRevenue();
    }
  });
}

function addRevenue() {
  const date = document.getElementById("revenueDate").value;
  const source = document.getElementById("revenueSource").value.trim();
  const amount = Number.parseInt(document.getElementById("revenueAmount").value, 10);

  if (!date || !source || Number.isNaN(amount)) {
    return;
  }

  revenueLog.unshift({
    id: Date.now(),
    date,
    source,
    amount,
  });

  saveJson(STORAGE_KEYS.revenue, revenueLog);
  document.getElementById("revenueSource").value = "";
  document.getElementById("revenueAmount").value = "";

  renderRevenue();

  const now = new Date();
  const remainingDays = Math.max(
    0,
    PLAN_DAYS - Math.floor((stripTime(now) - stripTime(new Date(startDate))) / 86_400_000),
  );
  updateRevenueSummary(remainingDays);
}

function renderRevenue() {
  const total = revenueLog.reduce((sum, entry) => sum + entry.amount, 0);
  const percent = Math.min(100, Math.round((total / REVENUE_TARGET) * 100));
  const remain = Math.max(0, REVENUE_TARGET - total);
  const revenueLogNode = document.getElementById("revenueLog");

  document.getElementById("totalRevenue").textContent = formatCurrency(total);
  document.getElementById("revenuePct").textContent = `${percent}%`;
  document.getElementById("remainRevenue").textContent = `${formatCurrency(remain)} 남음`;
  document.getElementById("revenueBar").style.width = `${percent}%`;

  if (revenueLog.length === 0) {
    revenueLogNode.innerHTML = '<div class="empty-state">수익 기록 없음. 첫 번째 수익을 기록해라.</div>';
    return;
  }

  revenueLogNode.innerHTML = revenueLog
    .map((entry) => {
      const amountClass = entry.amount >= 0 ? "revenue-amount-pos" : "revenue-amount-neg";
      const sign = entry.amount >= 0 ? "+" : "";
      return `
        <div class="revenue-log-item">
          <span class="task-sub">${escapeHtml(entry.date)}</span>
          <span>${escapeHtml(entry.source)}</span>
          <span class="${amountClass}">${sign}${formatCurrency(entry.amount)}</span>
        </div>
      `;
    })
    .join("");
}

function updateRevenueSummary(remainingDays) {
  const totalEarned = revenueLog.reduce((sum, entry) => sum + entry.amount, 0);
  const needed = Math.max(0, REVENUE_TARGET - totalEarned);
  const dailyNeeded = remainingDays > 0 ? Math.round(needed / remainingDays) : 0;
  document.getElementById("dailyNeeded").textContent = formatCurrency(dailyNeeded);
}

function bindExport() {
  document.getElementById("exportBtn").addEventListener("click", exportNotion);
}

async function exportNotion() {
  const output = document.getElementById("notionOutput");
  const lines = [];
  const sections = [
    { key: "urgent", label: "🔴 URGENT — 이번 주 안에 처리" },
    { key: "short", label: "🟠 SHORT-TERM — 30일 내 현금화" },
    { key: "mid", label: "🟡 MID-TERM — 31~90일 구조 잡기" },
    { key: "long", label: "🔵 LONG-TERM — 90일 이후" },
    { key: "legal", label: "⚖️ LEGAL — 법적 / 행정 추적" },
    { key: "routine", label: "✅ DAILY ROUTINE — 매일 루틴" },
    { key: "hold", label: "🚫 HOLD — 지금 손 떼는 것" },
  ];

  sections.forEach((section) => {
    lines.push(section.label);
    TASKS[section.key].forEach((task) => {
      const checked = doneSet.includes(task.id) ? "☑️" : "☐";
      lines.push(`${checked} ${task.name}`);
      lines.push(`   → ${task.sub} | 마감: ${task.deadline}`);
    });
    lines.push("");
  });

  const exportText = lines.join("\n");
  output.textContent = exportText;
  output.classList.add("visible");

  const button = document.getElementById("exportBtn");
  const originalLabel = "노션 붙여넣기 포맷 내보내기";

  try {
    await navigator.clipboard.writeText(exportText);
    button.textContent = "클립보드 복사 완료";
  } catch (error) {
    button.textContent = "복사는 브라우저 권한 필요";
  }

  window.setTimeout(() => {
    button.textContent = originalLabel;
  }, 2400);
}

function bindAgent() {
  const input = document.getElementById("agentInput");
  const sendButton = document.getElementById("agentSend");

  document.querySelectorAll("[data-quick]").forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.dataset.quick || "";
      sendToAgent();
    });
  });

  sendButton.addEventListener("click", sendToAgent);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendToAgent();
    }
  });
}

function sendToAgent() {
  const input = document.getElementById("agentInput");
  const sendButton = document.getElementById("agentSend");
  const text = input.value.trim();

  if (!text) {
    return;
  }

  input.value = "";
  sendButton.disabled = true;
  appendMessage("user", text);
  agentHistory.push({ role: "user", content: text });

  const loadingId = `loading-${Date.now()}`;
  appendMessage("ai", "분석 중...", loadingId, true);

  window.setTimeout(() => {
    document.getElementById(loadingId)?.remove();

    const reply = generateAgentReply(text);
    appendMessage("ai", reply);
    agentHistory.push({ role: "assistant", content: reply });
    agentHistory = agentHistory.slice(-20);
    sendButton.disabled = false;
    input.focus();
  }, 650);
}

function appendMessage(role, content, id = "", loading = false) {
  const wrap = document.getElementById("agentMessages");
  const node = document.createElement("div");
  node.className = `msg ${role}${loading ? " msg-loading" : ""}`;

  if (id) {
    node.id = id;
  }

  node.innerHTML = `
    <div class="msg-avatar ${role}">${role === "user" ? "YOU" : "AI"}</div>
    <div class="msg-content">${escapeHtml(content)}</div>
  `;

  wrap.appendChild(node);
  wrap.scrollTop = wrap.scrollHeight;
}

function generateAgentReply(question) {
  const normalized = question.toLowerCase();

  if (normalized.includes("glenci")) {
    return [
      "GLENCI는 공모전용으로 포지셔닝이 선명하다.",
      "1. 문제: 안경 피팅은 번거롭고 실패 비용이 크다.",
      "2. 해법: AI 가상 피팅 + 즉시 비교 + 구매 전환.",
      "3. 제출 포인트: 고령층/비대면/접근성 중 한 축을 강하게 잡아라.",
      "4. 오늘 할 일: 문제정의 3줄, 대상고객 1명, 핵심 장면 1개, 기대효과 수치 2개.",
      "V-Score 임시평가: 시장성 8 / 시급성 7 / 실행성 6 / 차별성 7.",
    ].join("\n");
  }

  if (normalized.includes("단가") || normalized.includes("패키지")) {
    return [
      "규복삼촌 건은 단품보다 패키지로 팔아야 한다.",
      "1. 기본형 150만원: 랜딩 1페이지 + 카카오/문의 연결.",
      "2. 표준형 220만원: 홈페이지 + 브랜드 문구 + GEO 기본 분석.",
      "3. 확장형 300만원: 표준형 + 경쟁사 비교 + 월 운영 제안.",
      "선금 50%, 중간확정 30%, 납품 20%로 끊어라.",
    ].join("\n");
  }

  if (normalized.includes("알레스카") || normalized.includes("문자")) {
    return [
      "문자 초안:",
      "",
      "고모, 이번 작업은 범위가 계속 커져서 현재 단가로는 진행이 어렵습니다.",
      "진행하시려면 작업 범위를 다시 정리하고 선금 기준으로 재협의해야 합니다.",
      "이번 주 안에 방향 주시면 일정 잡고, 아니면 여기서 정리하겠습니다.",
    ].join("\n");
  }

  if (normalized.includes("top3") || normalized.includes("집중")) {
    return [
      "오늘 TOP3만 뽑으면 이거다.",
      "1. 공모전 3건 초안 완성",
      "2. 규복삼촌 권한 요청 발송",
      "3. 알레스카 재협의 문자 발송",
      "이 세 개가 돈과 일정 둘 다 움직인다.",
    ].join("\n");
  }

  if (normalized.includes("n8n") || normalized.includes("자동화")) {
    return [
      "N8N은 바로 돈 되는 흐름부터 설계해라.",
      "1. 문의 수집 → Notion 저장 → 카톡 알림",
      "2. 상담 후속 문구 자동 전송",
      "3. 프로젝트 상태 변경 시 청구 알림",
      "첫 자동화는 내부용으로 만들고, 검증되면 외주 상품으로 전환하면 된다.",
    ].join("\n");
  }

  if (normalized.includes("농업")) {
    return [
      "8월 마감 체크리스트:",
      "1. 현재 사업자 업종/사업장 상태 확인",
      "2. 세무사 상담 예약 및 질문지 작성",
      "3. 증빙서류 목록 정리",
      "4. 주 1회 진행 점검 일정 고정",
      "벌금 리스크가 크니 이건 절대 감으로 가지 마라.",
    ].join("\n");
  }

  return [
    "질문 의도는 파악했다.",
    "지금 버전은 로컬 에이전트라서 장문 전략 문서보다 실행 지시형으로 답한다.",
    "원하면 이 답변 패턴을 더 늘리거나, 다음 단계에서 실제 LLM API 서버 연동으로 바꿔줄 수 있다.",
  ].join("\n");
}

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getOrCreateStartDate() {
  const existing = localStorage.getItem(STORAGE_KEYS.start);
  if (existing) {
    return existing;
  }

  const today = formatDateInput(new Date());
  localStorage.setItem(STORAGE_KEYS.start, today);
  return today;
}

function formatDateInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatCurrency(value) {
  return `₩${value.toLocaleString("ko-KR")}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
