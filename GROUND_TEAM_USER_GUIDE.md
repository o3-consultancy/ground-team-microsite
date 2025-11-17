# HomeBase UCO Ground Team User Guide

**Version:** 1.0
**Last Updated:** January 2025
**For:** Ground Team Members - Abu Dhabi
**System URL:** https://homebase-collect.neutralfuels.net

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Ad-hoc Signup](#ad-hoc-signup)
4. [Deploy Containers](#deploy-containers)
5. [Complete Collections](#complete-collections)
6. [Bulk Delivery](#bulk-delivery)
7. [Navigation Features](#navigation-features)
8. [QR Code Scanning](#qr-code-scanning)
9. [Today's Summary](#todays-summary)
10. [Troubleshooting](#troubleshooting)
11. [Best Practices](#best-practices)
12. [FAQ](#faq)

---

## Getting Started

### What is HomeBase UCO?

HomeBase UCO is a mobile-friendly web application designed to help ground team members manage household oil collection operations in Abu Dhabi. The system allows you to:

- Sign up new households
- Deploy containers to households
- Complete collections and swap containers
- Process bulk deliveries to the NF facility
- Track your daily performance

### System Requirements

- **Device:** Any smartphone, tablet, or computer
- **Browser:** Chrome, Safari, Firefox, or Edge (latest version)
- **Internet:** Active internet connection required
- **Location:** GPS/Location services enabled (for navigation)
- **Camera:** Camera access required (for QR code scanning)

### Logging In

**[INSERT SCREENSHOT: Login page]**

1. Open your web browser
2. Navigate to: **https://homebase-collect.neutralfuels.net**
3. Enter your **username** (provided by your supervisor)
4. Enter your **password**
5. Click **"Login"**

**Note:** If you forget your password, contact your supervisor to reset it.

**[INSERT SCREENSHOT: Login screen with fields filled]**

---

## Dashboard Overview

After logging in, you'll see the main dashboard. This is your home screen.

**[INSERT SCREENSHOT: Dashboard home screen]**

### Dashboard Components

#### 1. Header Section
- **Logo:** Neutral Fuels branding
- **Your Name:** Shows who is logged in
- **Logout Button:** Click to sign out

#### 2. Quick Actions Grid

The dashboard has 4 main action cards:

**[INSERT SCREENSHOT: Quick Actions grid]**

| Icon | Action | Description |
|------|--------|-------------|
| **+** | **Ad-hoc Signup** | Create new household signups and deploy immediately |
| **📦** | **Deploy** | Deploy containers to households assigned by OMS |
| **✓** | **Collect** | Complete collections and swap containers |
| **🚚** | **Delivery** | Deliver collected UCO to NF facility |

#### 3. Today's Summary

Shows your daily performance statistics:

**[INSERT SCREENSHOT: Today's Summary section]**

- **Signups:** Number of new households you signed up today
- **Deployments:** Number of containers you deployed today
- **Collections:** Number of collections you completed today

**Note:** Statistics update in real-time as you complete tasks.

#### 4. Bottom Navigation

Quick access to all features from any screen:

**[INSERT SCREENSHOT: Bottom navigation bar]**

- **Home:** Return to dashboard
- **Ad-hoc:** Quick signup
- **Deploy:** Deployment tasks
- **Collect:** Collection tasks
- **Delivery:** Bulk delivery

---

## Ad-hoc Signup

Use this feature to sign up new households on-site and deploy containers immediately.

### When to Use Ad-hoc Signup

- During door-to-door campaigns
- When a household approaches you directly
- For immediate signups that need instant deployment

### Step-by-Step Instructions

**[INSERT SCREENSHOT: Ad-hoc Signup form - empty]**

#### 1. Navigate to Ad-hoc Signup

- From the dashboard, click **"Ad-hoc Signup"**
- Or use the **"Ad-hoc"** tab in the bottom navigation

#### 2. Fill in Household Information

**Personal Details:**
- **Full Name:** Household contact person's full name
- **Mobile Number:** Phone number (e.g., +971501234567)
- **Email:** Email address (if available)
- **Language:** Select preferred language (English/Arabic)

**[INSERT SCREENSHOT: Personal details section filled]**

**Address Details:**
- **Villa Number:** e.g., V42, Villa 15
- **Community:** e.g., Al Falah 1A, Al Reef Villas
- **Street Name:** Full street address
- **Additional Notes:** Any special instructions (e.g., "Gate code: 1234")

**[INSERT SCREENSHOT: Address details section filled]**

**Preferred Collection Day:**
- Select the day of the week the household prefers collection
- Options: Sunday through Saturday

#### 3. Enter Container Information

**[INSERT SCREENSHOT: Container ID field with QR scanner button]**

- **Container ID:** Enter the container serial number
- **Or:** Click the **Scan** button to use QR code scanner

**Using QR Scanner:**

**[INSERT SCREENSHOT: QR scanner modal]**

1. Click the camera icon next to the Container ID field
2. Point your camera at the QR code on the container
3. Wait for automatic detection
4. Container ID will be filled automatically

#### 4. Review and Submit

**[INSERT SCREENSHOT: Filled form ready to submit]**

1. Review all entered information
2. Ensure container ID is correct
3. Click **"Sign Up & Deploy"**
4. Wait for confirmation message

#### 5. Success Confirmation

**[INSERT SCREENSHOT: Success message]**

You'll see a green success message showing:
- Household created successfully
- Container deployed
- All information saved

**Next Steps:**
- The household is now active in the system
- They will be scheduled for collections based on their preferred day
- Container is tracked under this household

---

## Deploy Containers

Deploy containers to households that have been assigned to you by the OMS team.

### Understanding Deployment Tasks

The OMS (Operations Management System) team assigns deployment tasks to you. These are households that:
- Have signed up through the website or app
- Have been approved by OMS
- Are awaiting container deployment

### Deployment Workflow

**[INSERT SCREENSHOT: Deployment tasks list]**

#### Step 1: View Your Assigned Tasks

1. Navigate to **"Deploy"** from dashboard or bottom navigation
2. You'll see a list of deployment tasks assigned to you
3. Each task shows:
   - **Villa Number** and **Community**
   - **Full Address**
   - **Status Badge** (NEW or IN PROGRESS)
   - **Task ID**
   - **Date Assigned**

**[INSERT SCREENSHOT: Deployment task card - NEW status]**

#### Step 2: Start a Deployment

For tasks with **NEW** status:

**[INSERT SCREENSHOT: Start Deployment button]**

1. Review the household address
2. Click **"Navigate To"** if you need directions (see [Navigation Features](#navigation-features))
3. Click **"Start Deployment"**
4. Status changes to **IN PROGRESS**
5. Container input field appears

**[INSERT SCREENSHOT: Deployment task card - IN PROGRESS status]**

#### Step 3: Enter Container Information

**[INSERT SCREENSHOT: Container input with QR scanner]**

1. **Option A - Manual Entry:**
   - Type the container serial number in the field
   - e.g., HB-UCO-00001

2. **Option B - QR Scan:**
   - Click the camera icon
   - Scan the container QR code
   - ID fills automatically

#### Step 4: Complete the Deployment

**[INSERT SCREENSHOT: Complete Deployment button enabled]**

1. Verify the container ID is correct
2. Click **"Complete Deployment"**
3. System performs the deployment
4. Task moves to "Deployment History"

#### Step 5: View Deployment History

**[INSERT SCREENSHOT: Deployment History section]**

At the bottom of the screen, you'll see:
- **Deployment History** section
- Lists all your completed deployments
- Shows:
  - Villa and community
  - Container ID deployed
  - Completion date and time
  - **COMPLETED** status badge

### Tips for Deployments

✅ **Do:**
- Start the deployment when you arrive at the household
- Double-check the container ID before completing
- Take a photo of the installed container for your records
- Explain to the household how to use the container

❌ **Don't:**
- Start a deployment if you're not sure you'll complete it immediately
- Use containers that are damaged or have unreadable QR codes
- Deploy to the wrong household address

---

## Complete Collections

Process collection requests from households that have full containers ready for pickup.

### Understanding Collection Requests

When a household's container is full, they request a collection through:
- The HomeBase mobile app
- The HomeBase website
- Calling the NF operations team

These requests are assigned to you based on your service area.

### Collection Workflow

**[INSERT SCREENSHOT: Complete Collection form]**

#### Step 1: View Pending Requests

1. Navigate to **"Collect"** from dashboard or bottom navigation
2. You'll see the **"Complete Collection"** card
3. Click **"Refresh"** to load the latest pending requests

**[INSERT SCREENSHOT: Pending collection requests dropdown]**

#### Step 2: Select a Collection Request

**[INSERT SCREENSHOT: Collection request dropdown with options]**

1. Click the dropdown menu under **"Pending collection requests"**
2. You'll see requests in this format:
   - **V42, Al Falah 1A — Container: HB-UCO-00001**
3. Select the request you want to complete

#### Step 3: Review Request Details

**[INSERT SCREENSHOT: Selected request details card]**

After selecting a request, you'll see detailed information:

- **Villa Number:** e.g., V42
- **Community:** e.g., Al Falah 1A
- **Container Serial:** Current container ID
- **Requested:** Date the collection was requested

**[INSERT SCREENSHOT: Navigate To button in collection details]**

**Navigate to Location:**
- Click **"Navigate To"** button
- Opens Google Maps with the household location
- Follow directions to the address

#### Step 4: Enter Collection Details

**[INSERT SCREENSHOT: Collected volume input]**

**Collected Volume:**
1. Enter the volume of UCO collected in **liters**
2. Use the number keypad
3. You can enter decimals (e.g., 18.5)

**Note:** Weight will be automatically set to the same value as volume.

**[INSERT SCREENSHOT: New container ID with QR scanner]**

**New Container ID:**
1. **Option A - Manual Entry:**
   - Type the new (empty) container serial number
   - This is the container you're leaving with the household

2. **Option B - QR Scan:**
   - Click the **"Scan"** button
   - Point camera at the new container's QR code
   - ID fills automatically

**[INSERT SCREENSHOT: QR scanner modal for new container]**

#### Step 5: Complete the Collection

**[INSERT SCREENSHOT: Complete Collection button]**

1. Review all information:
   - Collection request selected ✓
   - Volume entered ✓
   - New container ID entered ✓

2. Click **"Complete Collection & Swap"**

3. Wait for the system to process:
   - Records the collection
   - Updates the household's container
   - Marks the request as completed

#### Step 6: Success Confirmation

**[INSERT SCREENSHOT: Success message]**

You'll see a green message:
- **"Done! Collection completed and container swapped."**

The form will reset automatically, ready for the next collection.

### Collection Best Practices

✅ **Do:**
- Measure the volume accurately
- Scan or verify the new container ID twice
- Leave the new container in the same location as the old one
- Close the old container lid securely before transporting
- Thank the household for participating

❌ **Don't:**
- Guess the volume - measure accurately
- Leave an empty container that's damaged
- Forget to update the system before moving to the next household
- Spill UCO during container transfer

---

## Bulk Delivery

Deliver collected UCO to the Neutral Fuels facility.

### When to Complete Bulk Delivery

Perform a bulk delivery when:
- You have multiple full containers in your vehicle
- You're returning to the NF facility
- It's the end of your collection route
- Your supervisor instructs you to

### Bulk Delivery Workflow

**[INSERT SCREENSHOT: Delivery View - Pending Deliveries card]**

#### Step 1: Check Pending Deliveries

1. Navigate to **"Delivery"** from dashboard or bottom navigation
2. View the **"Pending Deliveries"** summary:
   - **Collections Ready:** Number of completed collections awaiting delivery
   - **Total Volume:** Total liters ready for delivery
   - **Total Weight:** Total weight in kilograms

**[INSERT SCREENSHOT: Pending deliveries summary with numbers]**

#### Step 2: Start the Delivery Process

**[INSERT SCREENSHOT: Complete Delivery button]**

1. Click **"Complete Delivery"** button
2. A modal will open with a 3-step process

**[INSERT SCREENSHOT: Delivery modal - Step 1]**

#### Step 3: Verify NF Staff Member

**Staff Verification (Step 1 of 3):**

**[INSERT SCREENSHOT: Staff verification input]**

1. Enter the **NF Staff Employee Number**
   - This is the receiving staff member at the NF facility
   - Example: 392200

2. Click **"Verify Staff"** (or press Enter)

3. System verifies the employee number

4. If valid, you'll see the staff member's name

5. Automatically advances to Step 2

**[INSERT SCREENSHOT: Staff verified successfully]**

**Troubleshooting:**
- **Invalid employee number:** Double-check the number and try again
- **Staff not found:** Ask the facility staff for their correct employee number

#### Step 4: Enter Delivery Details

**Delivery Details (Step 2 of 3):**

**[INSERT SCREENSHOT: Delivery details form]**

**Staff Verified:**
- Shows the verified staff member's name
- Displays in a green highlighted box

**Truck Number:**
1. Enter your truck/vehicle number
2. Example: TRUCK-001, NF-VAN-05
3. This is required for tracking purposes

**[INSERT SCREENSHOT: Truck number field]**

**Comments (Optional):**
- Add any notes about the delivery
- Examples:
  - "All containers from Al Falah area"
  - "Some containers had minor leaks"
  - "Delayed due to traffic"

**[INSERT SCREENSHOT: Comments field]**

**Delivery Summary:**
- **Collections:** Number of collections being delivered
- **Total Volume:** Total liters being delivered

**[INSERT SCREENSHOT: Pending deliveries summary in modal]**

#### Step 5: Complete the Delivery

**[INSERT SCREENSHOT: Complete Delivery button in modal]**

1. Review all information:
   - Staff verified ✓
   - Truck number entered ✓
   - Delivery summary correct ✓

2. Click **"Complete Delivery"**

3. System processes the delivery:
   - Records the delivery in UCO system
   - Updates all collection statuses
   - Generates delivery IDs

#### Step 6: Delivery Confirmation

**Delivery Complete (Step 3 of 3):**

**[INSERT SCREENSHOT: Delivery success screen]**

Success screen shows:
- ✅ **"Delivery Complete!"**
- **Collections Delivered:** Number of collections
- **Total Volume:** Total liters delivered
- **UCO Collection ID:** Internal tracking ID
- **Delivery ID:** Internal delivery tracking ID

**[INSERT SCREENSHOT: Delivery confirmation details]**

**Important:** Take a screenshot or note down the delivery IDs for your records.

#### Step 7: View Delivery History

**[INSERT SCREENSHOT: Recent Deliveries section]**

After closing the success modal, scroll down to see:

**Recent Deliveries:**
- Lists your recent deliveries
- Shows:
  - **Staff Name:** Who received the delivery
  - **Truck Number:** Your vehicle
  - **Collections Delivered:** Count
  - **Total Volume:** Liters
  - **Time:** When delivered (e.g., "2 hours ago")
  - **Comments:** Any notes you added

**[INSERT SCREENSHOT: Delivery history card]**

### Delivery Best Practices

✅ **Do:**
- Complete all collections before heading to the facility
- Double-check the receiving staff member's employee number
- Enter the correct truck number
- Add relevant comments about the delivery
- Keep containers secured during transport
- Unload containers carefully

❌ **Don't:**
- Deliver to unauthorized personnel
- Skip the staff verification step
- Forget to enter your truck number
- Leave without confirming the delivery was recorded
- Transport open or damaged containers

---

## Navigation Features

The system includes built-in navigation to help you find household locations.

### How Navigation Works

**[INSERT SCREENSHOT: Navigate To button]**

When you see a **"Navigate To"** button:

1. Click the button
2. System opens Google Maps in a new tab/window
3. On mobile devices, it may open your Maps app directly

**[INSERT SCREENSHOT: Google Maps opened with location]**

### Navigation Available In:

#### 1. Deployment Tasks
- Shows household address
- Opens maps with full address or villa/community

**[INSERT SCREENSHOT: Navigate button in deployment task]**

#### 2. Collection Requests
- Uses household GPS coordinates (latitude/longitude)
- More accurate than address-based navigation
- Opens maps with exact pin location

**[INSERT SCREENSHOT: Navigate button in collection details]**

### Tips for Using Navigation

✅ **Best Practices:**
- Check navigation before leaving for a task
- Download offline maps if you have poor signal in certain areas
- Verify the location looks correct before driving
- Use landmarks and community gates for reference

📱 **Mobile Tip:**
If you're using a mobile device, the system will try to open your device's native Maps app (Google Maps or Apple Maps) for better GPS tracking.

---

## QR Code Scanning

The system includes a built-in QR code scanner for quickly capturing container IDs.

### When to Use QR Scanner

**[INSERT SCREENSHOT: Scan button next to input field]**

Use the QR scanner for:
- **Deployments:** Scanning containers before deployment
- **Collections:** Scanning new containers during swap
- **Ad-hoc Signups:** Scanning containers for immediate deployment

### How to Use the QR Scanner

**[INSERT SCREENSHOT: QR scanner modal opening]**

#### Step 1: Open Scanner

1. Look for the camera icon button next to the Container ID field
2. Click the **Scan** button
3. Scanner modal opens

#### Step 2: Grant Camera Permission

**[INSERT SCREENSHOT: Camera permission prompt]**

**First time only:**
- Your browser will ask for camera permission
- Click **"Allow"** to grant access
- Required for QR code scanning to work

#### Step 3: Scan the QR Code

**[INSERT SCREENSHOT: Scanner active with camera view]**

1. Point your camera at the QR code on the container
2. Keep the QR code centered in the frame
3. Hold steady - the scanner will detect automatically
4. You don't need to take a photo or press anything

**[INSERT SCREENSHOT: QR code detected successfully]**

#### Step 4: Automatic Capture

**[INSERT SCREENSHOT: Success message with checkmark]**

When successful:
- ✅ Green checkmark appears
- **"Container ID captured!"** message shows
- Scanner automatically closes after 1 second
- Container ID field is filled automatically

#### Step 5: Verify Container ID

**[INSERT SCREENSHOT: Container ID field populated from scan]**

1. Check that the container ID is correct
2. Format is usually: HB-UCO-00001 or similar
3. If incorrect, you can scan again or enter manually

### Troubleshooting QR Scanner

**❌ Scanner Not Working:**

1. **Check Camera Permission:**
   - Go to browser settings
   - Ensure camera access is allowed for the website

2. **Poor Lighting:**
   - Move to better lighting
   - Avoid direct sunlight on the QR code
   - Use your phone's flashlight

3. **Damaged QR Code:**
   - Try cleaning the QR code label
   - If still unreadable, enter the container ID manually
   - Report damaged labels to your supervisor

4. **QR Code Format:**
   - System supports both URL format and plain text
   - URL format: `https://homebase.neutralfuels.net/container?containerId=HB-UCO-00001`
   - Plain text: `HB-UCO-00001`

**[INSERT SCREENSHOT: Scanner error message]**

**Camera Error Message:**
If you see an error, try:
- Refreshing the page
- Using a different browser
- Checking if another app is using the camera
- Restarting your device

---

## Today's Summary

Track your daily performance in real-time.

### Viewing Your Statistics

**[INSERT SCREENSHOT: Today's Summary on dashboard]**

The **"Today's Summary"** section appears on the dashboard and shows:

#### Statistics Displayed

**[INSERT SCREENSHOT: Stats with numbers]**

1. **Signups**
   - Number of households you signed up today
   - Includes ad-hoc signups only
   - Updates immediately after each signup

2. **Deployments**
   - Number of containers you deployed today
   - Includes both ad-hoc and assigned deployments
   - Updates immediately after each deployment

3. **Collections**
   - Number of collections you completed today
   - Shows container swaps completed
   - Updates immediately after each collection

### Understanding Your Stats

**Time Period:**
- **"Today"** means from 12:00 AM to 11:59 PM Dubai time
- Stats reset at midnight each day
- Yesterday's stats are saved in the system

**Real-Time Updates:**
- Statistics update immediately after completing each task
- You don't need to refresh the page
- If stats don't update, click **"Try Again"**

**[INSERT SCREENSHOT: Loading state for stats]**

**Loading States:**
- **Loading...** Shows a spinning icon while fetching data
- **Error State:** If stats fail to load, shows error message with "Try Again" button
- **Empty State:** If you haven't completed any tasks today, all stats show **0**

**[INSERT SCREENSHOT: Stats showing zeros]**

### Using Stats to Track Performance

✅ **Best Practices:**
- Check your stats at the start of your shift
- Review stats periodically throughout the day
- Compare with your daily targets
- Use stats to plan your route efficiently

📊 **Performance Goals:**
Your supervisor may set daily targets for:
- Minimum signups per day
- Minimum deployments per day
- Minimum collections per day

**[INSERT SCREENSHOT: Stats with sample numbers]**

---

## Troubleshooting

Common issues and solutions.

### Login Issues

**Problem: Can't login / Wrong password**

**[INSERT SCREENSHOT: Login error message]**

**Solutions:**
1. Double-check your username (no spaces, correct spelling)
2. Check Caps Lock is OFF
3. Clear browser cache and cookies
4. Try a different browser
5. Contact your supervisor for password reset

**Problem: "Session expired" message**

**Solutions:**
- This happens after long periods of inactivity
- Click **"Login"** to log in again
- Your work will be saved

### Page Loading Issues

**Problem: Page not loading / Stuck on loading**

**Solutions:**
1. Check internet connection
2. Refresh the page (pull down on mobile)
3. Clear browser cache
4. Try a different browser
5. Restart your device

**Problem: "Failed to load" errors**

**[INSERT SCREENSHOT: Error loading message]**

**Solutions:**
1. Check internet connection
2. Click **"Retry"** or **"Try Again"** button
3. Refresh the page
4. Contact supervisor if issue persists

### QR Scanner Issues

**Problem: Camera not working**

**Solutions:**
1. Grant camera permission in browser settings
2. Close other apps using the camera
3. Try a different browser
4. Restart your device

**Problem: QR code not scanning**

**Solutions:**
1. Clean the QR code label
2. Improve lighting conditions
3. Hold camera steady and closer/farther
4. Enter container ID manually if QR is damaged

### Form Submission Issues

**Problem: "Failed to submit" or "Error" messages**

**[INSERT SCREENSHOT: Submission error]**

**Solutions:**
1. Check all required fields are filled
2. Verify internet connection
3. Wait 30 seconds and try again
4. Copy your entered data (just in case)
5. Refresh page if issue persists
6. Contact support if repeatedly failing

**Problem: Success message but task still showing**

**Solutions:**
1. Click **"Refresh"** button
2. Refresh the browser page
3. Navigate to another page and back
4. Log out and log back in

### Navigation Issues

**Problem: Maps not opening**

**Solutions:**
1. Check if pop-ups are blocked
2. Allow pop-ups for this website
3. Try long-pressing the Navigate button
4. Copy the address manually

**Problem: Wrong location shown**

**Solutions:**
1. Verify the household details in the system
2. Contact your supervisor to update the address
3. Use villa number and community name as reference
4. Ask the household for landmarks

### Getting Help

**When to Contact Support:**
- Repeated login failures
- Data not saving correctly
- System errors that won't resolve
- Missing or incorrect household information
- Technical issues affecting your work

**How to Report Issues:**
1. Take a screenshot of the error
2. Note what you were trying to do
3. Note the time and date
4. Contact your supervisor immediately
5. Include any error messages shown

**Emergency Contact:**
- Supervisor: [SUPERVISOR PHONE]
- Operations Team: [OPERATIONS PHONE]
- IT Support: [IT SUPPORT EMAIL]

---

## Best Practices

### General Guidelines

✅ **Daily Routine:**
1. Log in at the start of your shift
2. Check Today's Summary to see your progress
3. Review assigned deployment tasks
4. Plan your route based on locations
5. Complete tasks systematically
6. Check stats before logging out

✅ **Data Entry:**
- Always double-check container IDs
- Enter accurate volume measurements
- Fill in all required fields
- Use QR scanner when possible for accuracy
- Verify addresses match the location

✅ **Battery Management:**
- Start day with full battery
- Carry a power bank
- Close unused apps
- Reduce screen brightness in direct sunlight

✅ **Internet Connection:**
- Complete tasks while online
- System requires internet connection
- Find good signal before submitting forms
- Notify supervisor if you're going to low-signal areas

### Safety Practices

🛡️ **Personal Safety:**
- Park safely when using the system
- Never use the system while driving
- Stay aware of your surroundings
- Follow all traffic laws

🛡️ **UCO Handling:**
- Wear gloves when handling containers
- Avoid spills - close lids tightly
- Clean spills immediately
- Dispose of waste properly
- Report leaking containers

🛡️ **Household Interactions:**
- Be polite and professional
- Explain the UCO collection process
- Answer questions about the program
- Provide contact information for support
- Thank them for participating

### Quality Standards

⭐ **Container Deployment:**
- Place containers in accessible locations
- Ensure containers are stable
- Check for leaks before deploying
- Show households how to use the container
- Verify QR code is readable

⭐ **Collection Process:**
- Measure volumes accurately
- Leave clean, undamaged containers
- Swap containers quickly
- Secure full containers in vehicle
- Update system immediately

⭐ **Documentation:**
- Complete all required fields
- Add helpful comments
- Keep screenshots of important deliveries
- Report issues promptly
- Maintain accurate records

---

## FAQ

### General Questions

**Q: Can I use the system on multiple devices?**
A: Yes, you can log in from any device with internet access. However, only use one device at a time.

**Q: What happens if I lose internet connection during a task?**
A: You won't be able to submit forms without internet. Complete the task and submit when you regain connection. Write down details on paper as backup.

**Q: Can I see other team members' tasks?**
A: No, you only see tasks assigned to you and your own statistics.

**Q: How long do I stay logged in?**
A: You'll stay logged in until you click "Logout" or after a long period of inactivity.

**Q: Can I complete tasks out of order?**
A: Yes, you can complete tasks in any order that makes sense for your route.

### Deployment Questions

**Q: What if I can't find the household address?**
A: Use the Navigate button to get directions. If still unable to locate, contact your supervisor and mark the task for reassignment.

**Q: What if the household isn't home?**
A: Contact the household by phone (if available). Contact your supervisor if unable to reach them. Don't complete the deployment.

**Q: Can I deploy a different container than the one I scanned?**
A: No, always deploy the exact container you recorded in the system. This ensures accurate tracking.

**Q: What if I don't have an empty container?**
A: Don't start the deployment task. Return to the warehouse to get containers first.

### Collection Questions

**Q: What if the container isn't full?**
A: Check if the household really wants a collection. Minimum collection volume is typically 5 liters. Collect anyway if the household insists.

**Q: What if I don't have an empty container for the swap?**
A: You must have an empty container ready before completing the collection. Return to warehouse if needed.

**Q: Can I collect without swapping?**
A: No, always swap the full container with an empty one. This ensures households can continue collecting.

**Q: What if the volume doesn't match my measurement?**
A: Enter the accurate volume you measured. The system uses this for proper tracking and reporting.

### Delivery Questions

**Q: When should I do a bulk delivery?**
A: When you have multiple full containers, at the end of your route, or when your supervisor instructs you.

**Q: What if the NF staff member's number isn't working?**
A: Ask the staff member for their correct employee number. Contact your supervisor if verification repeatedly fails.

**Q: Can I do multiple deliveries in one day?**
A: Yes, you can do as many deliveries as needed throughout your shift.

**Q: What if I forget to record a delivery?**
A: Contact your supervisor immediately. They may be able to record it manually. Never skip recording deliveries.

### Technical Questions

**Q: Which browsers work best?**
A: Chrome and Safari work best. Firefox and Edge also work well. Avoid using outdated browsers.

**Q: Can I use the system offline?**
A: No, the system requires internet connection. Plan your route to ensure you have signal in work areas.

**Q: What if the QR scanner doesn't work?**
A: You can always enter container IDs manually. Report QR scanner issues to your supervisor.

**Q: How do I update the app?**
A: It's a web app, so updates happen automatically. Just refresh the page to get the latest version.

**Q: Can I save my progress and complete later?**
A: Once you start a deployment (status: IN PROGRESS), you should complete it. Don't start tasks you can't finish immediately.

---

## Support Contact Information

### Need Help?

**Technical Support:**
- **Email:** it-support@neutralfuels.net
- **Phone:** [INSERT IT SUPPORT PHONE]

**Operations Team:**
- **Email:** operations@neutralfuels.net
- **Phone:** [INSERT OPERATIONS PHONE]

**Your Supervisor:**
- **Name:** [INSERT SUPERVISOR NAME]
- **Phone:** [INSERT SUPERVISOR PHONE]
- **Email:** [INSERT SUPERVISOR EMAIL]

### Emergency Contacts

**In case of emergency or urgent issues:**
- **24/7 Operations Hotline:** [INSERT EMERGENCY NUMBER]
- **Safety Emergency:** 999 (UAE Emergency Services)

---

## Document Information

**Version:** 1.0
**Last Updated:** January 2025
**Next Review:** April 2025

**Prepared By:** Neutral Fuels Operations Team
**For:** Ground Team Members - Abu Dhabi Region

---

**Thank you for using HomeBase UCO Ground Team System!**

Your work is essential to our mission of collecting and recycling used cooking oil in Abu Dhabi. If you have suggestions for improving this guide or the system, please share them with your supervisor.

**Stay safe and keep up the great work! 🚚♻️**
