# SchoolSync Pro — School Timetable & Substitution Agent

An attractive, responsive and interactive school operations prototype made with HTML, CSS and vanilla JavaScript.

## Run the project
1. Download and extract `SchoolSync_Pro.zip`.
2. Open the extracted `SchoolSync_Pro` folder in VS Code.
3. Open `index.html` in your browser, or use the VS Code **Live Server** extension and click **Go Live**.
4. Click **Substitution Agent** in the left navigation. Try **Compare matches**, **Assign teacher**, **Undo**, or **Run matching agent**.

No installation, API key, server, or internet connection is required for the core functionality. Google Fonts are optional visual enhancement; the app still works without them.

## Features
- Responsive dashboard and navigation.
- Timetable search, day/class filters, add and edit period.
- Conflict checks prevent double-booking a teacher.
- Report absence and create coverage requests.
- Candidate ranking using subject expertise, schedule availability, and workload.
- Compare alternative candidates, assign substitutes, undo assignments.
- Teacher directory with add/search/availability filters.
- CSV report export.
- Local persistence via browser `localStorage`.
- Reset demo data from Reports & Analytics.
- Input validation, empty states, status messages, and modal forms.

## Matching logic
1. Exclude the absent teacher.
2. Exclude anyone scheduled in the same day/period.
3. Exclude anyone already assigned to another substitution at the same day/period.
4. Exclude teachers who reached their maximum daily workload.
5. Score remaining candidates based on subject expertise and workload.
6. Re-check conflicts and workload when saving an assignment.

## For a 100-mark college project
This ZIP is a functional **front-end prototype** using a local rules-based agent and sample data. In your report/presentation, describe the agent honestly as a rule-based decision-support system, not a live AI model. It does not connect to a real school's database, messaging services, or cloud AI. A production deployment should add authentication, a secure backend/database, role-based access, audit logs, school-specific rules, and testing with real timetable constraints.

## Reset local data
Open browser developer tools → Console and run:
```js
localStorage.removeItem("schoolsync_pro_data_v2");
location.reload();
```
