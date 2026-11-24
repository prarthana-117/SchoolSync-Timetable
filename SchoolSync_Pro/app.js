(() => {
"use strict";
const KEY="schoolsync_pro_data_v2";
const seed={
 teachers:[
 {id:1,name:"Ananya Rao",subjects:["Mathematics","Physics"],max:5,load:3,room:"Staff Room 1"},
 {id:2,name:"Rahul Menon",subjects:["English","Social Studies"],max:5,load:2,room:"Staff Room 1"},
 {id:3,name:"Priya Sharma",subjects:["Biology","Science"],max:5,load:3,room:"Staff Room 2"},
 {id:4,name:"Kiran Patel",subjects:["Mathematics","Computer Science"],max:5,load:3,room:"Staff Room 2"},
 {id:5,name:"Meera Nair",subjects:["English","Hindi"],max:5,load:2,room:"Staff Room 1"},
 {id:6,name:"Arjun Shetty",subjects:["Physics","Science"],max:5,load:3,room:"Staff Room 3"},
 {id:7,name:"Divya Iyer",subjects:["Social Studies","History"],max:5,load:1,room:"Staff Room 2"},
 {id:8,name:"Vikram Das",subjects:["Computer Science","Mathematics"],max:5,load:2,room:"Staff Room 3"},
 {id:9,name:"Sneha Kulkarni",subjects:["Hindi","English"],max:5,load:3,room:"Staff Room 1"},
 {id:10,name:"Nikhil Verma",subjects:["Biology","Science"],max:5,load:2,room:"Staff Room 2"},
 {id:11,name:"Pooja Reddy",subjects:["Mathematics","Physics"],max:5,load:4,room:"Staff Room 3"},
 {id:12,name:"Sanjay Kumar",subjects:["History","Social Studies"],max:5,load:1,room:"Staff Room 2"}
 ],
 timetable:[
 {id:101,day:"Tuesday",period:1,time:"08:45–09:30",className:"Grade 8A",subject:"Mathematics",teacherId:1,room:"A-101"},
 {id:102,day:"Tuesday",period:1,time:"08:45–09:30",className:"Grade 8B",subject:"English",teacherId:2,room:"A-102"},
 {id:103,day:"Tuesday",period:2,time:"09:30–10:15",className:"Grade 8A",subject:"Science",teacherId:3,room:"A-101"},
 {id:104,day:"Tuesday",period:2,time:"09:30–10:15",className:"Grade 9A",subject:"Mathematics",teacherId:4,room:"B-201"},
 {id:105,day:"Tuesday",period:3,time:"10:30–11:15",className:"Grade 8A",subject:"English",teacherId:5,room:"A-101"},
 {id:106,day:"Tuesday",period:3,time:"10:30–11:15",className:"Grade 9A",subject:"Physics",teacherId:6,room:"B-201"},
 {id:107,day:"Tuesday",period:4,time:"11:15–12:00",className:"Grade 8B",subject:"Social Studies",teacherId:7,room:"A-102"},
 {id:108,day:"Tuesday",period:4,time:"11:15–12:00",className:"Grade 10A",subject:"Computer Science",teacherId:8,room:"C-301"},
 {id:109,day:"Tuesday",period:5,time:"12:45–13:30",className:"Grade 9A",subject:"Biology",teacherId:10,room:"B-201"},
 {id:110,day:"Tuesday",period:5,time:"12:45–13:30",className:"Grade 10A",subject:"English",teacherId:9,room:"C-301"},
 {id:111,day:"Tuesday",period:6,time:"13:30–14:15",className:"Grade 8A",subject:"Social Studies",teacherId:12,room:"A-101"},
 {id:112,day:"Tuesday",period:6,time:"13:30–14:15",className:"Grade 10A",subject:"Physics",teacherId:11,room:"C-301"},
 {id:113,day:"Monday",period:1,time:"08:45–09:30",className:"Grade 8A",subject:"English",teacherId:5,room:"A-101"},
 {id:114,day:"Wednesday",period:2,time:"09:30–10:15",className:"Grade 9A",subject:"Science",teacherId:3,room:"B-201"},
 {id:115,day:"Thursday",period:3,time:"10:30–11:15",className:"Grade 10A",subject:"Mathematics",teacherId:1,room:"C-301"},
 {id:116,day:"Friday",period:4,time:"11:15–12:00",className:"Grade 8B",subject:"History",teacherId:7,room:"A-102"}
 ],
 requests:[
 {id:501,day:"Tuesday",period:2,time:"09:30–10:15",className:"Grade 8A",subject:"Science",absentTeacherId:3,reason:"Sick leave",status:"open",substituteId:null},
 {id:502,day:"Tuesday",period:4,time:"11:15–12:00",className:"Grade 10A",subject:"Computer Science",absentTeacherId:8,reason:"Official duty",status:"open",substituteId:null},
 {id:503,day:"Tuesday",period:1,time:"08:45–09:30",className:"Grade 9B",subject:"Mathematics",absentTeacherId:11,reason:"Training",status:"assigned",substituteId:4},
 {id:504,day:"Tuesday",period:3,time:"10:30–11:15",className:"Grade 10B",subject:"English",absentTeacherId:2,reason:"Sick leave",status:"assigned",substituteId:5},
 {id:505,day:"Tuesday",period:5,time:"12:45–13:30",className:"Grade 8C",subject:"Biology",absentTeacherId:10,reason:"Personal leave",status:"assigned",substituteId:3},
 {id:506,day:"Tuesday",period:6,time:"13:30–14:15",className:"Grade 9B",subject:"History",absentTeacherId:12,reason:"Official duty",status:"assigned",substituteId:7},
 {id:507,day:"Tuesday",period:2,time:"09:30–10:15",className:"Grade 10B",subject:"Physics",absentTeacherId:6,reason:"Sick leave",status:"assigned",substituteId:11}
 ],
 activity:[
 {icon:"✓",title:"Priya Sharma assigned to Grade 8C",detail:"Biology · Period 5",time:"Today, 8:42 AM"},
 {icon:"⇄",title:"Substitution request created",detail:"Grade 10A · Computer Science",time:"Today, 8:31 AM"},
 {icon:"✓",title:"Meera Nair assigned to Grade 10B",detail:"English · Period 3",time:"Today, 8:20 AM"}
 ]
};
let db=load();let currentFilter="all";let modalHandler=null;let toastTimer=null;
function clone(v){return JSON.parse(JSON.stringify(v))}
function load(){try{const v=localStorage.getItem(KEY);if(v){const p=JSON.parse(v);if(p.teachers&&p.timetable&&p.requests)return p}}catch(e){}return clone(seed)}
function save(){try{localStorage.setItem(KEY,JSON.stringify(db))}catch(e){}}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function person(id){return db.teachers.find(t=>t.id===Number(id))}
function personName(id){return person(id)?.name||"Unknown teacher"}
function initials(s){return String(s).split(/\s+/).map(x=>x[0]||"").slice(0,2).join("").toUpperCase()}
function toast(msg){const el=document.getElementById("toast");document.getElementById("toastText").textContent=msg;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2800)}
function timeFor(p){return ({1:"08:45–09:30",2:"09:30–10:15",3:"10:30–11:15",4:"11:15–12:00",5:"12:45–13:30",6:"13:30–14:15",7:"14:15–15:00",8:"15:00–15:45"})[p]||"15:45–16:30"}
function isBusy(id,day,period,ignoreId=null){
 return db.timetable.some(x=>x.teacherId===Number(id)&&x.day===day&&x.period===Number(period)) ||
 db.requests.some(r=>r.id!==ignoreId&&r.status==="assigned"&&r.substituteId===Number(id)&&r.day===day&&r.period===Number(period));
}
function candidates(r){
 return db.teachers.filter(t=>t.id!==Number(r.absentTeacherId)&&!isBusy(t.id,r.day,r.period,r.id)&&t.load<t.max)
 .map(t=>{let exact=t.subjects.some(s=>s.toLowerCase()===r.subject.toLowerCase());let related=(r.subject==="Science"&&t.subjects.some(s=>["Biology","Physics","Science"].includes(s)))||(r.subject==="History"&&t.subjects.includes("Social Studies"))||(r.subject==="Social Studies"&&t.subjects.includes("History"));let score=Math.min(99,50+(exact?35:related?20:0)+Math.max(0,20-t.load*4));return {...t,score,expertise:exact||related}})
 .sort((a,b)=>b.score-a.score||a.load-b.load||a.name.localeCompare(b.name));
}
function candidate(r){return candidates(r)[0]||null}
function addActivity(icon,title,detail){db.activity.unshift({icon,title,detail,time:"Just now"});db.activity=db.activity.slice(0,12)}
function updateMetrics(){
 const open=db.requests.filter(r=>r.status==="open").length,assigned=db.requests.filter(r=>r.status==="assigned").length,total=db.requests.length,rate=total?Math.round(assigned/total*100):100;
 document.getElementById("openBadge").textContent=open;document.getElementById("metricOpen").textContent=open;
 document.getElementById("metricCoverage").innerHTML=`${rate}<span class="metric-percent">%</span>`;
 document.getElementById("coverageLine").style.width=rate+"%";document.getElementById("coverageCaption").textContent=`${assigned} of ${total} requests`;
 document.getElementById("metricTeachers").textContent=db.teachers.length;
 document.getElementById("metricPeriods").textContent=db.timetable.filter(x=>x.day==="Tuesday").length;
 document.getElementById("subOpenCount").textContent=`${open} open request${open===1?"":"s"}`;
 document.getElementById("subAssignedCount").textContent=`${assigned} covered period${assigned===1?"":"s"}`;
 document.getElementById("reportCoverage").textContent=rate+"%";document.getElementById("reportProgress").style.width=rate+"%";
 document.getElementById("reportOpen").textContent=open;document.getElementById("reportTeacherCount").textContent=db.teachers.length;
}
function renderDashboard(){
 const rows=db.timetable.filter(x=>x.day==="Tuesday").sort((a,b)=>a.period-b.period||a.className.localeCompare(b.className)).slice(0,5);
 document.getElementById("dashboardSchedule").innerHTML=rows.map(x=>{
  const r=db.requests.find(q=>q.day===x.day&&q.period===x.period&&q.className===x.className);
  const state=r?(r.status==="assigned"?"covered":"open"):"regular";
  return `<div class="schedule-row"><div class="schedule-time"><b>Period ${x.period}</b>${esc(x.time)}</div><i class="schedule-timeline ${state==="open"?"amber-line":state==="covered"?"mint-line":""}"></i><div class="schedule-info"><b>${esc(x.className)} · ${esc(x.subject)}</b><small>${esc(personName(x.teacherId))} · Room ${esc(x.room)}</small></div><span class="schedule-status ${state}">${state==="open"?"Needs cover":state==="covered"?"Covered":"Scheduled"}</span></div>`;
 }).join("")||`<div class="empty-state">No timetable entries for Tuesday.</div>`;
 const open=db.requests.filter(r=>r.status==="open");
 document.getElementById("agentHeadline").textContent=open.length?`${open.length} class${open.length===1?"":"es"} need coverage`:"All reported absences are covered";
 document.getElementById("agentSummary").textContent=open.length?"Eligible teachers are ranked by subject fit, schedule availability and workload. Review a match before confirming.":"Your reported absences are covered. The matching agent is ready for new requests.";
 document.getElementById("dashboardMatches").innerHTML=open.slice(0,3).map(r=>{const c=candidate(r);return c?`<div class="recommend-row"><div class="avatar-small">${initials(c.name)}</div><div class="recommend-meta"><b>${esc(c.name)}</b><small>${esc(r.className)} · ${esc(r.subject)}</small></div><span class="fit-pill">${c.score}% fit</span></div>`:`<div class="recommend-row"><div class="avatar-small">!</div><div class="recommend-meta"><b>No available match</b><small>${esc(r.className)} · ${esc(r.subject)}</small></div></div>`}).join("")||`<div class="empty-state">No open coverage requests. Nice work!</div>`;
 document.getElementById("activityFeed").innerHTML=db.activity.slice(0,4).map(a=>`<div class="activity-row"><div class="activity-icon">${esc(a.icon)}</div><div class="activity-text"><b>${esc(a.title)}</b><small>${esc(a.detail)}</small></div><span class="activity-time">${esc(a.time)}</span></div>`).join("");
}
function renderTimetable(){
 const q=(document.getElementById("scheduleSearch").value||"").toLowerCase(),day=document.getElementById("scheduleDay").value,cl=document.getElementById("scheduleClass").value;
 const rows=db.timetable.filter(x=>x.day===day&&(cl==="all"||x.className===cl)&&`${x.className} ${x.subject} ${personName(x.teacherId)} ${x.room}`.toLowerCase().includes(q)).sort((a,b)=>a.period-b.period||a.className.localeCompare(b.className));
 document.getElementById("scheduleCount").textContent=`${rows.length} entr${rows.length===1?"y":"ies"}`;
 document.getElementById("scheduleRows").innerHTML=rows.map(x=>{const r=db.requests.find(q=>q.day===x.day&&q.period===x.period&&q.className===x.className);const st=r?(r.status==="assigned"?"covered":"open"):"regular";return `<tr><td><strong>Period ${x.period}</strong></td><td>${esc(x.time)}</td><td><strong>${esc(x.className)}</strong></td><td><span class="subject-cell"><i class="subject-dot ${x.subject==="Mathematics"?"math":["Science","Biology","Physics"].includes(x.subject)?"science":x.subject==="English"?"english":""}"></i>${esc(x.subject)}</span></td><td>${esc(personName(x.teacherId))}</td><td>${esc(x.room)}</td><td><span class="schedule-status ${st}">${st==="open"?"Needs cover":st==="covered"?"Covered":"Scheduled"}</span></td><td><div class="table-actions"><button class="table-action" data-action="edit-period" data-id="${x.id}">Edit</button><button class="table-action danger-action" data-action="delete-period" data-id="${x.id}">Delete</button></div></td></tr>`}).join("")||`<tr><td colspan="8">No entries match these filters.</td></tr>`;
}
function renderRequests(){
 const items=db.requests.filter(r=>currentFilter==="all"||r.status===currentFilter).sort((a,b)=>a.status===b.status?a.period-b.period:a.status==="open"?-1:1);
 document.getElementById("requestList").innerHTML=items.map(r=>{
  const c=candidate(r),isAssigned=r.status==="assigned",sub=isAssigned?personName(r.substituteId):"";
  return `<article class="request-card"><div class="request-head-row"><div><div class="request-id">REQUEST · SS-${r.id}</div><h3>${esc(r.className)} · ${esc(r.subject)}</h3><div class="request-meta"><span>◷ ${esc(r.day)} · Period ${r.period} · ${esc(r.time)}</span><span>♙ Absent: ${esc(personName(r.absentTeacherId))}</span><span>▣ ${esc(r.reason)}</span></div></div><span class="status-chip ${r.status}">${isAssigned?"✓ Assigned":"Needs cover"}</span></div><div class="request-bottom">${isAssigned?`<div class="best-match"><div class="avatar-small">${initials(sub)}</div><div class="best-match-copy"><b>${esc(sub)}</b><small>Confirmed substitute · workload updated</small></div><span class="best-fit">✓ Confirmed</span></div>`:c?`<div class="best-match"><div class="avatar-small">${initials(c.name)}</div><div class="best-match-copy"><b>${esc(c.name)} <span style="color:#929caf;font-weight:500">· Recommended match</span></b><small>${esc(c.subjects.join(", "))} · Workload ${c.load}/${c.max}</small></div><span class="best-fit">${c.score}% fit</span></div>`:`<div class="no-match">No eligible teacher available. Try another period or review workloads.</div>`}<div class="request-actions">${isAssigned?`<button class="btn btn-light" data-action="undo-assignment" data-id="${r.id}">Undo</button>`:`<button class="btn btn-outline" data-action="view-matches" data-id="${r.id}">Compare matches</button><button class="btn btn-primary" data-action="assign-best" data-id="${r.id}" ${c?"":"disabled"}>Assign teacher ✓</button>`}</div></div></article>`;
 }).join("")||`<div class="empty-state">No requests in this filter.</div>`;
}
function renderTeachers(){
 const q=(document.getElementById("teacherSearch").value||"").toLowerCase(),f=document.getElementById("teacherFilter").value;
 const rows=db.teachers.filter(t=>`${t.name} ${t.subjects.join(" ")}`.toLowerCase().includes(q)).filter(t=>f==="all"||(f==="busy"?isBusy(t.id,"Tuesday",2):!isBusy(t.id,"Tuesday",2)));
 document.getElementById("teacherGrid").innerHTML=rows.map(t=>{const busy=isBusy(t.id,"Tuesday",2);return `<article class="teacher-card"><div class="teacher-top"><div class="teacher-avatar">${initials(t.name)}</div><div><div class="teacher-name">${esc(t.name)}</div><div class="teacher-room">${esc(t.room)}</div></div><span class="schedule-status ${busy?"open":"covered"} teacher-status">${busy?"Busy":"Available"}</span></div><div class="subject-chips">${t.subjects.map(s=>`<span class="subject-chip">${esc(s)}</span>`).join("")}</div><div class="teacher-load"><span>Daily workload</span><b>${t.load} / ${t.max} periods</b></div><div class="load-bar"><i style="width:${Math.min(100,t.load/t.max*100)}%;background:${t.load>=4?"#e4a142":"#7969ed"}"></i></div><div class="teacher-actions"><button class="btn btn-outline btn-small" data-action="edit-teacher" data-id="${t.id}">Edit profile</button><button class="btn btn-light btn-small danger-text" data-action="delete-teacher" data-id="${t.id}">Remove</button></div></article>`}).join("")||`<div class="empty-state">No teachers match your search.</div>`;
}
function renderReports(){
 document.getElementById("reportRows").innerHTML=db.requests.slice().sort((a,b)=>b.id-a.id).map(r=>`<tr><td><strong>SS-${r.id}</strong></td><td>${esc(r.className)} · ${esc(r.subject)}</td><td>${esc(personName(r.absentTeacherId))}</td><td>${esc(r.status==="assigned"?personName(r.substituteId):"—")}</td><td>${esc(r.reason)}</td><td><span class="status-chip ${r.status}">${r.status==="assigned"?"Assigned":"Needs cover"}</span></td></tr>`).join("")||`<tr><td colspan="6">No substitution records yet.</td></tr>`;
}
function render(){updateMetrics();renderDashboard();renderTimetable();renderRequests();renderTeachers();renderReports()}
function go(page){document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id==="page-"+page));document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.page===page));document.getElementById("breadcrumb").textContent=({dashboard:"Overview",timetable:"Timetable",substitutions:"Substitution Agent",teachers:"Teachers",reports:"Reports & Analytics"})[page]||"Overview";document.getElementById("sidebar").classList.remove("open");window.scrollTo({top:0,behavior:"smooth"})}
function showModal(title,subtitle,fields,handler,saveLabel="Save changes"){
 document.getElementById("modalTitle").textContent=title;document.getElementById("modalSubtitle").textContent=subtitle||"Complete the fields below.";document.getElementById("modalError").textContent="";
 document.getElementById("modalFields").innerHTML=fields.map(f=>`<div class="form-field ${f.full?"full":""}"><label for="field-${f.name}">${esc(f.label)}</label>${f.type==="select"?`<select id="field-${f.name}" name="${f.name}" ${f.required?"required":""}>${f.options.map(o=>`<option value="${esc(o.value)}" ${String(o.value)===String(f.value)?"selected":""}>${esc(o.label)}</option>`).join("")}</select>`:`<input id="field-${f.name}" name="${f.name}" type="${f.type||"text"}" ${f.required?"required":""} ${f.min!==undefined?`min="${f.min}"`:""} ${f.max!==undefined?`max="${f.max}"`:""} value="${f.value!==undefined?esc(f.value):""}" placeholder="${esc(f.placeholder||"")}">`}</div>`).join("");
 document.getElementById("modalSave").innerHTML=`${esc(saveLabel)} <span>→</span>`;modalHandler=handler;document.getElementById("modalBackdrop").classList.add("show");setTimeout(()=>document.querySelector("#modalFields input, #modalFields select")?.focus(),50);
}
function closeModal(){document.getElementById("modalBackdrop").classList.remove("show");modalHandler=null}
function values(){return Object.fromEntries(new FormData(document.getElementById("modalForm")).entries())}
function fail(message){document.getElementById("modalError").textContent=message;return false}
function absenceModal(){
 const teachers=db.teachers.map(t=>({value:t.id,label:t.name})),days=["Monday","Tuesday","Wednesday","Thursday","Friday"].map(x=>({value:x,label:x})),periods=[1,2,3,4,5,6,7,8].map(x=>({value:x,label:`Period ${x} · ${timeFor(x)}`})),classes=["Grade 8A","Grade 8B","Grade 8C","Grade 9A","Grade 9B","Grade 10A","Grade 10B"].map(x=>({value:x,label:x})),subjects=["Mathematics","English","Science","Biology","Physics","Computer Science","Social Studies","History","Hindi"].map(x=>({value:x,label:x}));
 showModal("Report a teacher absence","Create a coverage request for a class period.",[
 {name:"teacherId",label:"Absent teacher",type:"select",options:teachers,required:true},
 {name:"day",label:"Day",type:"select",options:days,value:"Tuesday",required:true},
 {name:"period",label:"Period",type:"select",options:periods,value:2,required:true},
 {name:"className",label:"Class needing cover",type:"select",options:classes,required:true},
 {name:"subject",label:"Subject",type:"select",options:subjects,required:true},
 {name:"reason",label:"Reason",type:"select",options:["Sick leave","Official duty","Training","Personal leave","Other"].map(x=>({value:x,label:x})),required:true}
 ],d=>{
  const tid=Number(d.teacherId),p=Number(d.period);
  if(db.requests.some(r=>r.status==="open"&&r.day===d.day&&r.period===p&&r.className===d.className))return fail("An open request already exists for that class and period.");
  const id=Date.now(),existing=db.timetable.find(x=>x.day===d.day&&x.period===p&&x.className===d.className);
  db.requests.unshift({id,day:d.day,period:p,time:existing?.time||timeFor(p),className:d.className,subject:d.subject,absentTeacherId:tid,reason:d.reason,status:"open",substituteId:null});
  addActivity("⇄",`Absence reported for ${personName(tid)}`,`${d.className} · ${d.subject} · Period ${p}`);save();closeModal();render();toast("Absence reported. Recommendations updated.");go("substitutions");return true;
 },"Create request");
}
function teacherModal(){
 showModal("Add a teacher","Add a teacher profile for the matching agent.",[
 {name:"name",label:"Full name",full:true,required:true,placeholder:"e.g. Kavya Rao"},
 {name:"subjects",label:"Subjects (comma-separated)",full:true,required:true,placeholder:"Mathematics, Physics"},
 {name:"max",label:"Daily maximum periods",type:"number",value:5,min:1,max:12,required:true},
 {name:"load",label:"Current workload",type:"number",value:0,min:0,max:12,required:true},
 {name:"room",label:"Staff room",full:true,value:"Staff Room 1",required:true}
 ],d=>{const max=Number(d.max),load=Number(d.load),subjects=d.subjects.split(",").map(s=>s.trim()).filter(Boolean);if(!d.name.trim())return fail("Enter the teacher's name.");if(!subjects.length)return fail("Enter at least one subject.");if(load>max)return fail("Current workload cannot exceed the daily maximum.");db.teachers.push({id:Date.now(),name:d.name.trim(),subjects,max,load,room:d.room.trim()||"Staff Room 1"});addActivity("♙",`${d.name.trim()} added to directory`,subjects.join(", "));save();closeModal();render();toast("Teacher profile added.");return true},"Add teacher");
}
function editTeacherModal(id){
 const t=person(id);if(!t)return;
 showModal("Edit teacher profile","Update staff expertise and workload.",[
 {name:"name",label:"Full name",full:true,value:t.name,required:true},
 {name:"subjects",label:"Subjects (comma-separated)",full:true,value:t.subjects.join(", "),required:true},
 {name:"max",label:"Daily maximum periods",type:"number",value:t.max,min:1,max:12,required:true},
 {name:"load",label:"Current workload",type:"number",value:t.load,min:0,max:12,required:true},
 {name:"room",label:"Staff room",full:true,value:t.room,required:true}
 ],d=>{const max=Number(d.max),load=Number(d.load),subjects=d.subjects.split(",").map(x=>x.trim()).filter(Boolean);if(!d.name.trim())return fail("Enter the teacher's name.");if(!subjects.length)return fail("Enter at least one subject.");if(load>max)return fail("Workload cannot exceed the daily maximum.");Object.assign(t,{name:d.name.trim(),subjects,max,load,room:d.room.trim()||"Staff Room 1"});addActivity("♙",`${t.name} profile updated`,subjects.join(", "));save();closeModal();render();toast("Teacher profile updated.");return true},"Save profile");
}
function deleteTeacher(id){
 const t=person(id);if(!t)return;
 const linked=db.timetable.some(x=>x.teacherId===t.id)||db.requests.some(r=>r.absentTeacherId===t.id||r.substituteId===t.id);
 if(linked){toast("This teacher is linked to timetable or substitution records. Keep the record or update those links first.");return}
 showModal("Remove teacher?",`This will remove ${t.name} from the staff directory.`,[{name:"confirm",label:"Type REMOVE to confirm",full:true,required:true,placeholder:"REMOVE"}],d=>{if(d.confirm.trim()!=="REMOVE")return fail("Type REMOVE exactly to confirm.");db.teachers=db.teachers.filter(x=>x.id!==t.id);addActivity("♙",`${t.name} removed from directory`,"Teacher record removed");save();closeModal();render();toast("Teacher removed.");return true},"Remove teacher");
}
function deletePeriod(id){
 const x=db.timetable.find(r=>r.id===Number(id));if(!x)return;
 showModal("Delete timetable period?",`${x.className} · ${x.subject} · ${x.day}, Period ${x.period}`, [{name:"confirm",label:"Type DELETE to confirm",full:true,required:true,placeholder:"DELETE"}],d=>{if(d.confirm.trim()!=="DELETE")return fail("Type DELETE exactly to confirm.");db.timetable=db.timetable.filter(r=>r.id!==x.id);addActivity("▦",`Timetable period removed · ${x.className}`,`${x.subject} · ${x.day}, Period ${x.period}`);save();closeModal();render();toast("Timetable period deleted.");return true},"Delete period");
}
function periodModal(id=null){
 const existing=id?db.timetable.find(x=>x.id===Number(id)):null;
 const days=["Monday","Tuesday","Wednesday","Thursday","Friday"].map(x=>({value:x,label:x})),classes=["Grade 8A","Grade 8B","Grade 8C","Grade 9A","Grade 9B","Grade 10A","Grade 10B"].map(x=>({value:x,label:x})),subjects=["Mathematics","English","Science","Biology","Physics","Computer Science","Social Studies","History","Hindi"].map(x=>({value:x,label:x})),periods=[1,2,3,4,5,6,7,8].map(x=>({value:x,label:`Period ${x} · ${timeFor(x)}`}));
 showModal(existing?"Edit timetable period":"Add timetable period","Schedule a class and validate teacher availability.",[
 {name:"day",label:"Day",type:"select",options:days,value:existing?.day||"Tuesday",required:true},
 {name:"period",label:"Period",type:"select",options:periods,value:existing?.period||1,required:true},
 {name:"className",label:"Class",type:"select",options:classes,value:existing?.className||"Grade 8A",required:true},
 {name:"subject",label:"Subject",type:"select",options:subjects,value:existing?.subject||"Mathematics",required:true},
 {name:"teacherId",label:"Teacher",type:"select",options:db.teachers.map(t=>({value:t.id,label:t.name})),value:existing?.teacherId||db.teachers[0]?.id,required:true},
 {name:"room",label:"Room",value:existing?.room||"A-101",required:true}
 ],d=>{const p=Number(d.period),tid=Number(d.teacherId);if(db.timetable.some(x=>x.id!==existing?.id&&x.day===d.day&&x.period===p&&x.className===d.className))return fail("This class already has a period at that time.");if(db.timetable.some(x=>x.id!==existing?.id&&x.day===d.day&&x.period===p&&x.teacherId===tid))return fail("This teacher is already scheduled in another class at that time.");const row={id:existing?.id||Date.now(),day:d.day,period:p,time:timeFor(p),className:d.className,subject:d.subject,teacherId:tid,room:d.room.trim()};if(existing)db.timetable=db.timetable.map(x=>x.id===existing.id?row:x);else db.timetable.push(row);addActivity("▦",`${existing?"Timetable updated":"Period added"} · ${d.className}`,`${d.subject} · ${d.day}, Period ${p}`);save();closeModal();render();toast(existing?"Timetable period updated.":"Timetable period added.");return true},existing?"Save changes":"Add period");
}
function assign(rid,tid){
 const r=db.requests.find(x=>x.id===Number(rid));if(!r||r.status!=="open"){toast("This request is no longer open.");return}
 const t=person(tid);if(!t){toast("Teacher not found.");return}
 if(t.id===Number(r.absentTeacherId)){toast("The absent teacher cannot cover their own class.");return}
 if(isBusy(t.id,r.day,r.period,r.id)){toast(`${t.name} is already scheduled during this period.`);return}
 if(t.load>=t.max){toast(`${t.name} has reached their daily workload limit.`);return}
 r.status="assigned";r.substituteId=t.id;t.load++;
 addActivity("✓",`${t.name} assigned to ${r.className}`,`${r.subject} · ${r.day}, Period ${r.period}`);
 save();render();toast(`${t.name} assigned successfully.`);
}
function matchesModal(rid){
 const r=db.requests.find(x=>x.id===Number(rid));if(!r)return;const list=candidates(r);
 if(!list.length){toast("No eligible teachers. Try another period or review staff workload.");return}
 showModal("Compare substitute matches",`${r.className} · ${r.subject} · ${r.day}, Period ${r.period}`,[
 {name:"teacherId",label:"Choose a teacher",type:"select",required:true,options:list.map(t=>({value:t.id,label:`${t.name} — ${t.score}% fit · workload ${t.load}/${t.max}`})),value:list[0].id}
 ],d=>{const tid=Number(d.teacherId);closeModal();assign(rid,tid);return true},"Assign selected");
}
function undo(rid){const r=db.requests.find(x=>x.id===Number(rid));if(!r||r.status!=="assigned")return;const t=person(r.substituteId);if(t)t.load=Math.max(0,t.load-1);r.status="open";r.substituteId=null;addActivity("↶",`Assignment reopened for ${r.className}`,`${r.subject} · Period ${r.period}`);save();render();toast("Assignment undone; request is open again.");}
function runAgent(){
 const open=db.requests.filter(r=>r.status==="open");let done=0;
 for(const r of open){const c=candidate(r);if(c){r.status="assigned";r.substituteId=c.id;c.load++;addActivity("✦",`Agent matched ${c.name} to ${r.className}`,`${r.subject} · Period ${r.period}`);done++}}
 save();render();toast(done?`Agent completed ${done} safe assignment${done===1?"":"s"}.`:"No eligible matches found. Review open requests manually.");
}
function exportCSV(){
 const rows=[["Request ID","Day","Period","Time","Class","Subject","Absent Teacher","Substitute","Reason","Status"],...db.requests.map(r=>[`SS-${r.id}`,r.day,r.period,r.time,r.className,r.subject,personName(r.absentTeacherId),r.status==="assigned"?personName(r.substituteId):"",r.reason,r.status])];
 const csv=rows.map(row=>row.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\r\n");const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="schoolsync-substitution-report.csv";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);toast("CSV report downloaded.");
}
function resetDemo(){showModal("Reset demo data?","This restores the original sample teachers, timetable and requests.",[{name:"confirm",label:"Type RESET to confirm",full:true,required:true,placeholder:"RESET"}],d=>{if(d.confirm.trim()!=="RESET")return fail("Type RESET exactly to confirm.");db=clone(seed);save();closeModal();render();go("dashboard");toast("Demo data restored.");return true},"Reset data")}
function action(name,id){if(name==="new-absence")absenceModal();else if(name==="add-teacher")teacherModal();else if(name==="add-period")periodModal();else if(name==="edit-period")periodModal(id);else if(name==="delete-period")deletePeriod(id);else if(name==="edit-teacher")editTeacherModal(id);else if(name==="delete-teacher")deleteTeacher(id);else if(name==="run-agent")runAgent();else if(name==="export")exportCSV();else if(name==="view-matches")matchesModal(id);else if(name==="assign-best"){const r=db.requests.find(x=>x.id===Number(id)),c=r&&candidate(r);if(c)assign(id,c.id)}else if(name==="undo-assignment")undo(id);else if(name==="reset-demo")resetDemo()}
document.addEventListener("click",e=>{
 const nav=e.target.closest("[data-page]");if(nav){e.preventDefault();go(nav.dataset.page);return}
 const act=e.target.closest("[data-action]");if(act){action(act.dataset.action,act.dataset.id);return}
 const filter=e.target.closest("[data-filter]");if(filter){currentFilter=filter.dataset.filter;document.querySelectorAll(".filter-tab").forEach(b=>b.classList.toggle("active",b===filter));renderRequests()}
});
document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
document.getElementById("scheduleSearch").addEventListener("input",renderTimetable);document.getElementById("scheduleDay").addEventListener("change",renderTimetable);document.getElementById("scheduleClass").addEventListener("change",renderTimetable);
document.getElementById("teacherSearch").addEventListener("input",renderTeachers);document.getElementById("teacherFilter").addEventListener("change",renderTeachers);
document.getElementById("modalClose").addEventListener("click",closeModal);document.getElementById("modalCancel").addEventListener("click",closeModal);
document.getElementById("modalBackdrop").addEventListener("click",e=>{if(e.target.id==="modalBackdrop")closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
document.getElementById("modalForm").addEventListener("submit",e=>{e.preventDefault();if(modalHandler){const result=modalHandler(values());if(result!==false&&document.getElementById("modalBackdrop").classList.contains("show"))closeModal()}});
document.getElementById("helpBtn").addEventListener("click",()=>showModal("Welcome to SchoolSync","Quick guide to the working demo.",[
 {name:"tip1",label:"1. Report an absence",full:true,type:"select",options:[{value:"Use Report absence to create a request.",label:"Use Report absence to create a request."}]},
 {name:"tip2",label:"2. Match and assign",full:true,type:"select",options:[{value:"Review recommendations or compare alternate teachers.",label:"Review recommendations or compare alternate teachers."}]},
 {name:"tip3",label:"3. Reports",full:true,type:"select",options:[{value:"Export your substitution log as a CSV file.",label:"Export your substitution log as a CSV file."}]}
 ],()=>{closeModal();return true},"Got it"));
document.getElementById("profileBtn").addEventListener("click",()=>toast("Administrator workspace · Local demo data"));
document.getElementById("todayDate").textContent=new Date().toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"});
render();
})();