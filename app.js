const PLAN_DEFAULT_START = "2026-03-28";
const PLAN_DURATION_DAYS = 100;
const REVENUE_TARGET = 10_000_000;
const DAY_MS = 86_400_000;

const STORAGE_KEYS = {
  done: "hosu_done_tasks",
  daily: "hosu_daily_checks",
  revenue: "hosu_revenue_log",
  start: "hosu_plan_start",
};

const LEGACY_KEYS = {
  done: ["rlk_done"],
  revenue: ["rlk_revenue"],
  start: ["rlk_start"],
};

const STATUS_META = {
  urgent: { label: "URGENT", className: "status-chip--urgent", priority: 0 },
  legal: { label: "LEGAL", className: "status-chip--legal", priority: 1 },
  wait: { label: "WAIT", className: "status-chip--wait", priority: 2 },
  ready: { label: "READY", className: "status-chip--ready", priority: 3 },
  hold: { label: "HOLD", className: "status-chip--hold", priority: 4 },
};

const SECTION_LABELS = {
  urgent: "이번 주 마감",
  short: "30일 현금화",
  mid: "구조 만들기",
  long: "장기 과제",
  legal: "리스크 관리",
  routine: "오늘 루틴",
  hold: "재검토",
};

const TASKS = {
  urgent: [
    { id: "u1", name: "모두의 아이디어 GLENCI 작성", sub: "강호수 명의로 초안 작성 후 제출 품질까지 끌어올리기", dueDate: "2026-04-15", status: "urgent" },
    { id: "u2", name: "모두의 아이디어 노인 카카오택시 초안", sub: "이민정 명의로 제출 시나리오 분리", dueDate: "2026-04-15", status: "urgent" },
    { id: "u3", name: "모두의 아이디어 노인 전용 UI 초안", sub: "강호이 명의로 제출안 구성", dueDate: "2026-04-15", status: "urgent" },
    { id: "u4", name: "안양 시장 건 전화 응답", sub: "전화 오면 바로 범위와 납기 확정", dueDate: "2026-03-28", status: "wait" },
    { id: "u5", name: "비디봇 설문 결과 확인과 방향 결정", sub: "답변이 오면 챗봇 제안 구조까지 정리", dueDate: "2026-03-29", status: "wait" },
    { id: "u6", name: "알레스카 단가 재협의 문자 발송", sub: "이번 주 안에 기준을 명확히 하고 아니면 보류", dueDate: "2026-03-28", status: "urgent" },
    { id: "u7", name: "규복삼촌 권한 요청 카톡 발송", sub: "CI / SNS 권한 양식을 오늘 바로 보내기", dueDate: "2026-03-28", status: "urgent" },
  ],
  short: [
    { id: "s1", name: "규복삼촌 서브브랜드 홈페이지 개발", sub: "권한 수령 후 바로 착수해서 4월 안에 납품", dueDate: "2026-04-30", status: "ready" },
    { id: "s2", name: "규복삼촌 GEO 분석 보고서 제안안", sub: "홈페이지와 묶어서 단가를 올릴 패키지 설계", dueDate: "2026-04-27", status: "ready" },
    { id: "s3", name: "엄마 크몽 서비스 등록", sub: "서비스 문구, 범위, 가격표 정리 후 업로드", dueDate: "2026-04-18", status: "ready" },
    { id: "s4", name: "엄마 마케팅 자동화 기획", sub: "크몽 등록 이후 연결할 자동화 흐름 초안", dueDate: "2026-04-30", status: "hold" },
    { id: "s5", name: "세무사 상담 예약", sub: "농업재단과 사업자 이슈를 한 번에 정리", dueDate: "2026-04-02", status: "urgent" },
  ],
  mid: [
    { id: "m1", name: "GLENCI 홈페이지와 프로그램 개발", sub: "외주 납품 흐름이 안정된 뒤 제품화 시작", dueDate: "2026-06-26", status: "ready" },
    { id: "m2", name: "GEO 마케팅 외주 패키지 구조 설계", sub: "코세라 강의와 바이브 코딩 학습을 반영", dueDate: "2026-05-31", status: "ready" },
    { id: "m3", name: "GEO 마케팅 홈페이지 제작", sub: "실제 판매 구조가 나온 뒤 제작으로 연결", dueDate: "2026-06-20", status: "hold" },
    { id: "m4", name: "N8N 학습과 워크플로우 설계", sub: "주 3시간 학습으로 상품화 가능한 흐름 만들기", dueDate: "2026-05-30", status: "ready" },
    { id: "m5", name: "벨조 마케팅 자동화 설계", sub: "N8N 기초가 정리되면 적용", dueDate: "2026-06-25", status: "hold" },
    { id: "m6", name: "챗봇 사업 구조화", sub: "비디봇 답변 후 구독형 구조로 정리", dueDate: "2026-05-20", status: "wait" },
  ],
  long: [
    { id: "l1", name: "알레스카 홈페이지 개발", sub: "재협의와 선금 기준이 확정된 뒤만 진행", dueDate: "2026-07-20", status: "hold" },
    { id: "l2", name: "GLENCI 본격 개발", sub: "공동창업 구조와 시장 검증 후 진행", dueDate: "2026-08-15", status: "hold" },
    { id: "l3", name: "농업 사업 운영 구조 정리", sub: "8월 말까지 요건을 충족해야 리스크를 피할 수 있음", dueDate: "2026-08-31", status: "legal" },
  ],
  legal: [
    { id: "g1", name: "농업재단 사업 요건 충족 확인", sub: "포천 도소매 등록과 세무 확인을 실제 일정으로 관리", dueDate: "2026-08-31", status: "legal" },
    { id: "g2", name: "형사 소송 결과 확인", sub: "결과 도착 즉시 대응할 수 있게 정기 확인", dueDate: "2026-04-10", status: "wait" },
    { id: "g3", name: "지급명령 신청 건 주간 추적", sub: "주 1회 진행 상황을 체크하는 관리 항목", dueDate: "2026-04-03", status: "wait" },
    { id: "g4", name: "세무사 통합 상담", sub: "농업 / 사업자 / 업종 관련 질문지를 미리 정리", dueDate: "2026-04-02", status: "urgent" },
  ],
  routine: [
    { id: "r1", name: "수면 7.5시간 이상", sub: "00:00 취침, 09:00 기상 리듬 유지", status: "ready", kind: "daily", timeBlock: "오늘 아침 체크" },
    { id: "r2", name: "헬스 1회", sub: "10:20 ~ 11:20, Zone2와 근력 병행", status: "ready", kind: "daily", timeBlock: "오늘 운동 체크" },
    { id: "r3", name: "독서 1시간 15분", sub: "이동 시간을 활용해서 루틴화", status: "ready", kind: "daily", timeBlock: "오늘 독서 체크" },
    { id: "r4", name: "코세라 GEO 강의 1강", sub: "매일 한 강씩 쌓아서 패키지 설계력 확보", status: "ready", kind: "daily", timeBlock: "오늘 학습 체크" },
    { id: "r5", name: "100일 기록 작성", sub: "19:00 ~ 20:00, 오늘 한 일과 내일 한 일을 기록", status: "urgent", kind: "daily", timeBlock: "오늘 기록 체크" },
    { id: "r6", name: "저녁 산책 20분", sub: "스마트폰 없이 리듬 회복 시간 만들기", status: "ready", kind: "daily", timeBlock: "오늘 저녁 체크" },
  ],
  hold: [
    { id: "h1", name: "알레스카 추가 작업", sub: "재협의와 선금 전까지 멈춤", reviewDate: "2026-04-05", status: "hold" },
    { id: "h2", name: "벨조 자동화", sub: "N8N 기본기가 생길 때까지 대기", reviewDate: "2026-05-15", status: "hold" },
    { id: "h3", name: "비디봇 추가 진행", sub: "상대 답변이 오기 전까지 에너지 투입 금지", reviewDate: "2026-03-30", status: "hold" },
    { id: "h4", name: "GEO 홈페이지 제작 착수", sub: "학습과 패키지 설계가 먼저", reviewDate: "2026-05-20", status: "hold" },
  ],
};

Object.entries(TASKS).forEach(([section, list]) => {
  list.forEach((task) => {
    task.section = section;
  });
});

const ALL_TASKS = Object.values(TASKS).flat();
const TASK_INDEX = Object.fromEntries(ALL_TASKS.map((task) => [task.id, task]));

let doneTasks = sanitizeDoneList(loadJsonWithLegacy(STORAGE_KEYS.done, LEGACY_KEYS.done, []));
let dailyChecks = sanitizeDailyChecks(loadJson(STORAGE_KEYS.daily, {}));
let revenueLog = sanitizeRevenueLog(loadJsonWithLegacy(STORAGE_KEYS.revenue, LEGACY_KEYS.revenue, []));
const startDateIso = getOrCreateStartDate();
pruneDailyChecks();

document.addEventListener("DOMContentLoaded", () => {
  bindTabs();
  bindGlobalClicks();
  bindInputs();
  renderApp();
});

function bindTabs() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
  });
}

function bindGlobalClicks() {
  document.addEventListener("click", (event) => {
    const taskToggle = event.target.closest("[data-task-id]");
    if (taskToggle) {
      toggleTask(taskToggle.dataset.taskId);
      return;
    }

    const quickButton = event.target.closest("[data-quick]");
    if (quickButton) {
      const input = document.getElementById("agentInput");
      input.value = quickButton.dataset.quick || "";
      sendToAgent();
      return;
    }

    if (event.target.closest("#exportBtn")) {
      exportNotion();
      return;
    }

    if (event.target.closest("#addRevenueBtn")) {
      addRevenue();
      return;
    }

    if (event.target.closest("#agentSend")) {
      sendToAgent();
    }
  });
}

function bindInputs() {
  document.getElementById("revenueAmount").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addRevenue();
    }
  });

  document.getElementById("revenueDate").addEventListener("input", updateRevenuePreview);

  document.getElementById("agentInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendToAgent();
    }
  });
}

function renderApp() {
  const today = stripTime(new Date());
  const planStart = parseISODate(startDateIso);
  const planEnd = addDays(planStart, PLAN_DURATION_DAYS);
  const remainingDays = Math.max(0, PLAN_DURATION_DAYS - diffDays(planStart, today));
  const focusTasks = getFocusTasks(today);
  const nextTask = getNextDeadlineTask(today);
  const routineTasks = TASKS.routine;
  const routineDone = routineTasks.filter((task) => isTaskDone(task)).length;
  const trackableTasks = ALL_TASKS.filter((task) => task.section !== "hold");
  const doneCount = trackableTasks.filter((task) => isTaskDone(task)).length;
  const executionPercent = trackableTasks.length > 0 ? Math.round((doneCount / trackableTasks.length) * 100) : 0;
  const totalRevenue = getTotalRevenue();
  const remainingRevenue = Math.max(0, REVENUE_TARGET - totalRevenue);
  const dailyNeeded = remainingDays > 0 ? Math.ceil(remainingRevenue / remainingDays) : 0;

  renderHeader(today, planStart, planEnd);
  renderHero(planEnd, remainingDays, focusTasks, nextTask, executionPercent);
  renderSummary(doneCount, trackableTasks.length, routineDone, routineTasks.length, remainingRevenue, dailyNeeded, nextTask, today);
  renderFocusList(focusTasks, today);
  renderTaskSections(today);
  renderRevenue(totalRevenue, remainingRevenue, dailyNeeded, remainingDays, planEnd);
}

function renderHeader(today, planStart, planEnd) {
  document.getElementById("todayDate").textContent = formatFullDate(today);
  document.getElementById("planRange").textContent = `${formatCompactDate(planStart)} - ${formatCompactDate(planEnd)}`;
}

function renderHero(planEnd, remainingDays, focusTasks, nextTask, executionPercent) {
  const headline = focusTasks.length > 0
    ? `오늘은 핵심 일 ${focusTasks.length}개만 끝내면 됩니다.`
    : "오늘 핵심 일은 정리됐습니다. 루틴만 지키면 됩니다.";

  const nextTaskLine = nextTask
    ? `${nextTask.name} (${formatCompactDate(getTaskAnchorDate(nextTask))})`
    : "가까운 마감 일정은 모두 정리되어 있습니다.";

  document.getElementById("heroHeadline").textContent = headline;
  document.getElementById("heroSubline").textContent = `플랜 종료일은 ${formatCompactDate(planEnd)}입니다. 지금 가장 가까운 일정은 ${nextTaskLine}`;
  document.getElementById("dayCounter").textContent = `D-${remainingDays}`;
  document.getElementById("nextDeadlineBadge").textContent = nextTask ? formatCompactDate(getTaskAnchorDate(nextTask)) : "정리 완료";
  document.getElementById("executionBar").style.width = `${executionPercent}%`;
  document.getElementById("executionLabel").textContent = `오늘 실행률 ${executionPercent}%`;
  document.getElementById("focusLabel").textContent = focusTasks.length > 0 ? `핵심 일 ${focusTasks.length}개 남음` : "핵심 일 정리 완료";
  document.getElementById("routineCaption").textContent = `${formatCompactDate(stripTime(new Date()))} 기준으로 매일 다시 체크합니다.`;
}

function renderSummary(doneCount, totalTrackable, routineDone, routineTotal, remainingRevenue, dailyNeeded, nextTask, today) {
  const nextLabel = nextTask ? formatCompactDate(getTaskAnchorDate(nextTask)) : "정리 완료";
  const nextSub = nextTask
    ? `${nextTask.name} · ${getDueChipMeta(nextTask, today).label}`
    : "현재 가까운 마감 일정이 없습니다.";

  document.getElementById("summaryExecutionValue").textContent = `${doneCount} / ${totalTrackable}`;
  document.getElementById("summaryExecutionSub").textContent = totalTrackable > 0
    ? `실행률 ${Math.round((doneCount / totalTrackable) * 100)}%`
    : "체크할 항목이 없습니다.";

  document.getElementById("summaryRoutineValue").textContent = `${routineDone} / ${routineTotal}`;
  document.getElementById("summaryRoutineSub").textContent = routineDone === routineTotal
    ? "오늘 루틴을 모두 지켰습니다."
    : "오늘 루틴을 다시 체크하세요.";

  document.getElementById("summaryRevenueValue").textContent = formatCurrency(remainingRevenue);
  document.getElementById("summaryRevenueSub").textContent = `하루 평균 ${formatCurrency(dailyNeeded)} 필요`;

  document.getElementById("summaryNextValue").textContent = nextLabel;
  document.getElementById("summaryNextSub").textContent = nextSub;
}

function renderFocusList(focusTasks, today) {
  const container = document.getElementById("topFocusList");
  if (focusTasks.length === 0) {
    container.innerHTML = '<div class="empty-card">오늘 기준으로 가장 급한 핵심 일은 정리되었습니다. 남은 시간은 루틴과 준비 작업에 쓰면 됩니다.</div>';
    return;
  }

  container.innerHTML = focusTasks.map((task) => {
    const dueMeta = getDueChipMeta(task, today);
    const anchorDate = formatCompactDate(getTaskAnchorDate(task));
    return `
      <button class="focus-item" type="button" data-task-id="${task.id}">
        <div class="focus-item__top">
          <span class="status-chip ${STATUS_META[task.status].className}">${SECTION_LABELS[task.section]}</span>
          <span class="due-chip ${dueMeta.className}">${dueMeta.label}</span>
        </div>
        <strong>${escapeHtml(task.name)}</strong>
        <p>${escapeHtml(task.sub)}</p>
        <div class="focus-item__meta">
          <span class="task-chip">${anchorDate}</span>
          <span class="task-chip">${STATUS_META[task.status].label}</span>
        </div>
      </button>
    `;
  }).join("");
}

function renderTaskSections(today) {
  Object.entries(TASKS).forEach(([section, list]) => {
    const container = document.getElementById(`tasks-${section}`);
    if (!container) {
      return;
    }

    const sorted = [...list].sort((a, b) => compareTasks(a, b, today));
    container.innerHTML = sorted.map((task) => renderTask(task, today)).join("");
  });
}

function renderTask(task, today) {
  const status = STATUS_META[task.status] || STATUS_META.hold;
  const isDone = isTaskDone(task);
  const dueMeta = getDueChipMeta(task, today);
  const dateLabel = getTaskDateLabel(task, today);

  return `
    <button class="task-item ${isDone ? "done" : ""}" type="button" data-task-id="${task.id}" aria-pressed="${isDone}">
      <span class="task-check" aria-hidden="true"></span>
      <span class="task-body">
        <span class="task-headline">
          <strong class="task-name">${escapeHtml(task.name)}</strong>
          <span class="status-chip ${status.className}">${status.label}</span>
        </span>
        <span class="task-sub">${escapeHtml(task.sub)}</span>
        <span class="task-meta">
          <span class="task-chip">${escapeHtml(dateLabel)}</span>
          ${task.kind === "daily" && task.timeBlock ? `<span class="task-chip">${escapeHtml(task.timeBlock)}</span>` : ""}
          <span class="due-chip ${dueMeta.className}">${dueMeta.label}</span>
        </span>
      </span>
    </button>
  `;
}

function renderRevenue(totalRevenue, remainingRevenue, dailyNeeded, remainingDays, planEnd) {
  const percent = Math.min(100, Math.round((totalRevenue / REVENUE_TARGET) * 100));
  const previewDate = document.getElementById("revenueDate").value || formatDateInput(stripTime(new Date()));

  document.getElementById("revenuePlanEnd").textContent = `종료일 ${formatCompactDate(planEnd)}`;
  document.getElementById("revenueInsight").textContent = `${formatCompactDate(planEnd)}까지 ${formatCurrency(remainingRevenue)}이 남아 있습니다. 하루 평균 ${formatCurrency(dailyNeeded)}이 필요합니다.`;
  document.getElementById("totalRevenue").textContent = formatCurrency(totalRevenue);
  document.getElementById("revenuePct").textContent = `${percent}%`;
  document.getElementById("remainRevenue").textContent = `${formatCurrency(remainingRevenue)} 남음`;
  document.getElementById("dailyNeeded").textContent = formatCurrency(dailyNeeded);
  document.getElementById("daysLeft").textContent = `${remainingDays}일 남음`;
  document.getElementById("revenueBar").style.width = `${percent}%`;
  document.getElementById("revenueDate").value = previewDate;
  document.getElementById("revenueDatePreview").textContent = formatCompactDate(parseISODate(previewDate));

  const log = document.getElementById("revenueLog");
  if (revenueLog.length === 0) {
    log.innerHTML = '<div class="empty-card">아직 기록된 수익이 없습니다. 오늘 생긴 금액부터 바로 적기 시작하면 됩니다.</div>';
    return;
  }

  const sortedLog = [...revenueLog].sort((a, b) => {
    if (a.date === b.date) {
      return b.id - a.id;
    }
    return b.date.localeCompare(a.date);
  });

  log.innerHTML = sortedLog.map((entry) => {
    const amountClass = entry.amount >= 0 ? "revenue-log-item__amount--pos" : "revenue-log-item__amount--neg";
    const sign = entry.amount >= 0 ? "+" : "";
    return `
      <div class="revenue-log-item">
        <span class="revenue-log-item__date">${escapeHtml(formatCompactDate(parseISODate(entry.date)))}</span>
        <span class="revenue-log-item__source">${escapeHtml(entry.source)}</span>
        <span class="revenue-log-item__amount ${amountClass}">${sign}${formatCurrency(entry.amount)}</span>
      </div>
    `;
  }).join("");
}

function updateRevenuePreview() {
  const value = document.getElementById("revenueDate").value;
  if (!value) {
    return;
  }
  document.getElementById("revenueDatePreview").textContent = formatCompactDate(parseISODate(value));
}

function toggleTask(taskId) {
  const task = TASK_INDEX[taskId];
  if (!task) {
    return;
  }

  if (task.kind === "daily") {
    const todayKey = getTodayKey();
    const todays = new Set(dailyChecks[todayKey] || []);
    if (todays.has(taskId)) {
      todays.delete(taskId);
    } else {
      todays.add(taskId);
    }
    dailyChecks[todayKey] = [...todays];
    localStorage.setItem(STORAGE_KEYS.daily, JSON.stringify(dailyChecks));
  } else if (doneTasks.includes(taskId)) {
    doneTasks = doneTasks.filter((id) => id !== taskId);
    localStorage.setItem(STORAGE_KEYS.done, JSON.stringify(doneTasks));
  } else {
    doneTasks = [...doneTasks, taskId];
    localStorage.setItem(STORAGE_KEYS.done, JSON.stringify(doneTasks));
  }

  renderApp();
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

  localStorage.setItem(STORAGE_KEYS.revenue, JSON.stringify(revenueLog));
  document.getElementById("revenueSource").value = "";
  document.getElementById("revenueAmount").value = "";
  renderApp();
}

async function exportNotion() {
  const today = stripTime(new Date());
  const output = document.getElementById("notionOutput");
  const lines = [];
  const sections = [
    { key: "urgent", label: "이번 주 마감" },
    { key: "short", label: "30일 현금화" },
    { key: "mid", label: "구조 만들기" },
    { key: "long", label: "장기 과제" },
    { key: "legal", label: "리스크 관리" },
    { key: "routine", label: "오늘 루틴" },
    { key: "hold", label: "재검토" },
  ];

  sections.forEach((section) => {
    lines.push(section.label);
    TASKS[section.key].forEach((task) => {
      const mark = isTaskDone(task) ? "[x]" : "[ ]";
      const dateLabel = getTaskDateLabel(task, today);
      lines.push(`${mark} ${task.name}`);
      lines.push(`    ${task.sub} | 일정: ${dateLabel}`);
    });
    lines.push("");
  });

  const exportText = lines.join("\n");
  output.textContent = exportText;
  output.classList.add("visible");

  const button = document.getElementById("exportBtn");
  const originalLabel = "노션용 텍스트 복사";

  try {
    await navigator.clipboard.writeText(exportText);
    button.textContent = "복사 완료";
  } catch (error) {
    button.textContent = "복사는 브라우저 권한 필요";
  }

  window.setTimeout(() => {
    button.textContent = originalLabel;
  }, 2200);
}

function switchTab(name) {
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `panel-${name}`);
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === name);
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

  const loadingId = `loading-${Date.now()}`;
  appendMessage("ai", "정리 중입니다...", loadingId, true);

  window.setTimeout(() => {
    document.getElementById(loadingId)?.remove();
    appendMessage("ai", generateAgentReply(text));
    sendButton.disabled = false;
    input.focus();
  }, 520);
}

function appendMessage(role, content, id = "", isLoading = false) {
  const wrap = document.getElementById("agentMessages");
  const node = document.createElement("div");
  node.className = `msg ${role}${isLoading ? " msg-loading" : ""}`;

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
  const today = stripTime(new Date());

  if (normalized.includes("우선순위")) {
    const focusTasks = getFocusTasks(today);
    if (focusTasks.length === 0) {
      return `${formatCompactDate(today)} 기준으로 가장 급한 핵심 일은 정리되어 있습니다. 루틴 유지와 준비 작업에 집중하면 됩니다.`;
    }

    return [
      `${formatCompactDate(today)} 기준 오늘 우선순위입니다.`,
      ...focusTasks.map((task, index) => `${index + 1}. ${task.name} - ${formatCompactDate(getTaskAnchorDate(task))}`),
      "",
      "이 세 개만 끝내면 오늘은 충분합니다.",
    ].join("\n");
  }

  if (normalized.includes("단가") || normalized.includes("패키지")) {
    return [
      "규복삼촌 건은 단품보다 패키지로 제안하는 게 맞습니다.",
      "1. 기본형 150만원: 랜딩 1페이지 + 문의 연결",
      "2. 표준형 220만원: 홈페이지 + 브랜드 문구 정리 + GEO 기본 분석",
      "3. 확장형 300만원: 표준형 + 경쟁사 비교 + 운영 제안",
      "선금 50%, 중간 확정 30%, 납품 20% 구조로 가면 일정 통제가 쉬워집니다.",
    ].join("\n");
  }

  if (normalized.includes("알레스카") || normalized.includes("재협의") || normalized.includes("문자")) {
    return [
      "문자 초안입니다.",
      "",
      "이번 작업은 현재 범위로는 기존 단가에서 진행이 어렵습니다.",
      "계속 진행하시려면 범위와 일정, 선금 기준을 다시 정리해서 재협의하고 싶습니다.",
      "이번 주 안에 방향 주시면 일정 잡고, 아니면 여기서 정리하겠습니다.",
    ].join("\n");
  }

  if (normalized.includes("공모전")) {
    return [
      "2026년 4월 15일 공모전 제출 체크리스트입니다.",
      "1. 2026.03.28 초안 3개 완성",
      "2. 2026.03.29 제목 / 문제정의 / 기대효과 정리",
      "3. 2026.04.05 제출본 1차 완성",
      "4. 2026.04.10 피드백 반영",
      "5. 2026.04.15 최종 제출",
    ].join("\n");
  }

  if (normalized.includes("n8n") || normalized.includes("자동화")) {
    return [
      "첫 번째 N8N 상품은 내부 업무 자동화에서 시작하는 게 좋습니다.",
      "1. 문의 수집 → 노션 저장 → 카톡 알림",
      "2. 상담 후속 메시지 자동 전송",
      "3. 프로젝트 상태 변경 → 청구 일정 알림",
      "먼저 내가 써보고 안정화되면 외주 상품으로 전환하세요.",
    ].join("\n");
  }

  if (normalized.includes("법적") || normalized.includes("농업")) {
    const legalTasks = [...TASKS.legal, TASKS.long.find((task) => task.id === "l3")].filter(Boolean);
    return [
      "실제 날짜 기준으로 챙겨야 할 법적 / 행정 일정입니다.",
      ...legalTasks.map((task) => `- ${task.name}: ${formatCompactDate(getTaskAnchorDate(task))}`),
      "",
      "이 일정들은 프로젝트보다 먼저 실제 날짜로 추적하는 편이 안전합니다.",
    ].join("\n");
  }

  return [
    `${formatCompactDate(today)} 기준 질문을 확인했습니다.`,
    "지금 버전은 실행용 로컬 코치라서 바로 움직일 수 있는 답변에 집중합니다.",
    "오늘 우선순위, 문자 초안, 단가 구조, 법적 일정 정리 같은 질문이 특히 잘 맞습니다.",
  ].join("\n");
}

function getFocusTasks(today) {
  return ALL_TASKS
    .filter((task) => task.section !== "routine" && task.section !== "hold" && !isTaskDone(task))
    .sort((a, b) => compareTasks(a, b, today))
    .slice(0, 3);
}

function getNextDeadlineTask(today) {
  return ALL_TASKS
    .filter((task) => task.section !== "routine" && task.section !== "hold" && !isTaskDone(task))
    .sort((a, b) => compareTasks(a, b, today))[0] || null;
}

function compareTasks(a, b, today) {
  const statusGap = STATUS_META[a.status].priority - STATUS_META[b.status].priority;
  if (statusGap !== 0) {
    return statusGap;
  }

  const dateGap = diffDays(today, getTaskAnchorDate(a)) - diffDays(today, getTaskAnchorDate(b));
  if (dateGap !== 0) {
    return dateGap;
  }

  return a.name.localeCompare(b.name, "ko");
}

function isTaskDone(task) {
  if (task.kind === "daily") {
    return (dailyChecks[getTodayKey()] || []).includes(task.id);
  }
  return doneTasks.includes(task.id);
}

function getTaskAnchorDate(task) {
  if (task.kind === "daily") {
    return stripTime(new Date());
  }
  if (task.dueDate) {
    return parseISODate(task.dueDate);
  }
  if (task.reviewDate) {
    return parseISODate(task.reviewDate);
  }
  return stripTime(new Date());
}

function getTaskDateLabel(task, today) {
  if (task.kind === "daily") {
    return `${formatCompactDate(today)} · ${task.timeBlock}`;
  }

  if (task.reviewDate) {
    return `재검토 ${formatCompactDate(parseISODate(task.reviewDate))}`;
  }

  if (task.dueDate) {
    return formatCompactDate(parseISODate(task.dueDate));
  }

  return "일정 확인 필요";
}

function getDueChipMeta(task, today) {
  if (task.kind === "daily") {
    return { label: "오늘", className: "due-chip--today" };
  }

  const diff = diffDays(today, getTaskAnchorDate(task));

  if (task.section === "hold") {
    if (diff < 0) {
      return { label: `${Math.abs(diff)}일 지남`, className: "due-chip--hold" };
    }
    if (diff === 0) {
      return { label: "오늘 재검토", className: "due-chip--hold" };
    }
    return { label: `D-${diff}`, className: "due-chip--hold" };
  }

  if (diff < 0) {
    return { label: `${Math.abs(diff)}일 지남`, className: "due-chip--today" };
  }
  if (diff === 0) {
    return { label: "오늘", className: "due-chip--today" };
  }
  if (diff <= 7) {
    return { label: `D-${diff}`, className: "due-chip--soon" };
  }
  return { label: `D-${diff}`, className: "due-chip--safe" };
}

function getTotalRevenue() {
  return revenueLog.reduce((sum, entry) => sum + entry.amount, 0);
}

function getTodayKey() {
  return formatDateInput(stripTime(new Date()));
}

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function loadJsonWithLegacy(primaryKey, legacyKeys, fallback) {
  const primary = loadJson(primaryKey, null);
  if (primary !== null) {
    return primary;
  }

  for (const legacyKey of legacyKeys) {
    const legacy = loadJson(legacyKey, null);
    if (legacy !== null) {
      localStorage.setItem(primaryKey, JSON.stringify(legacy));
      return legacy;
    }
  }

  return fallback;
}

function getOrCreateStartDate() {
  const fromPrimary = localStorage.getItem(STORAGE_KEYS.start);
  if (fromPrimary) {
    return fromPrimary;
  }

  for (const legacyKey of LEGACY_KEYS.start) {
    const legacy = localStorage.getItem(legacyKey);
    if (legacy) {
      localStorage.setItem(STORAGE_KEYS.start, legacy);
      return legacy;
    }
  }

  localStorage.setItem(STORAGE_KEYS.start, PLAN_DEFAULT_START);
  return PLAN_DEFAULT_START;
}

function sanitizeDoneList(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((id) => typeof id === "string" && TASK_INDEX[id] && TASK_INDEX[id].kind !== "daily");
}

function sanitizeDailyChecks(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).map(([date, ids]) => [
      date,
      Array.isArray(ids)
        ? ids.filter((id) => typeof id === "string" && TASK_INDEX[id] && TASK_INDEX[id].kind === "daily")
        : [],
    ]),
  );
}

function sanitizeRevenueLog(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => ({
      id: Number(entry.id) || Date.now(),
      date: typeof entry.date === "string" ? entry.date : PLAN_DEFAULT_START,
      source: typeof entry.source === "string" ? entry.source : "",
      amount: Number(entry.amount) || 0,
    }))
    .filter((entry) => entry.source);
}

function pruneDailyChecks() {
  const today = stripTime(new Date());
  const kept = {};

  Object.entries(dailyChecks).forEach(([date, ids]) => {
    const gap = Math.abs(diffDays(parseISODate(date), today));
    if (gap <= 14) {
      kept[date] = ids;
    }
  });

  dailyChecks = kept;
  localStorage.setItem(STORAGE_KEYS.daily, JSON.stringify(dailyChecks));
}

function parseISODate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return stripTime(next);
}

function diffDays(from, to) {
  return Math.round((stripTime(to) - stripTime(from)) / DAY_MS);
}

function formatDateInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatCompactDate(date) {
  const dayName = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day} ${dayName}`;
}

function formatFullDate(date) {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}

function formatCurrency(value) {
  const sign = value < 0 ? "-" : "";
  return `${sign}₩${Math.abs(value).toLocaleString("ko-KR")}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
