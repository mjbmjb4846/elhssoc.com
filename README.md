# East Lansing High School Science Olympiad Club Website

Welcome to the ELHSSOC website repository! This guide will help you contribute to the website even if you're not a programmer. The website is built using HTML, CSS, and JavaScript with custom web components.

## 🖼️ Adding Images

### Where to Put Images

**For Science Olympiad Club Photos (competitions, events, team photos):**
- Place images in the `images/SO2026/` folder
- This folder is specifically for the current 2025-2026 season

**For General/Miscellaneous Images:**
- Place images in the `images/misc/` folder
- Use this for non-club specific content, logos, or general graphics

### Image Naming Guidelines

**For Club Photos:**
- Use descriptive names that include the event and year
- Examples: `SOregionals2026.webp`, `SOteamPhoto2026.webp`, `SOstates2026.webp`
- Follow the existing naming pattern: `SO[activity][year].webp`

**For Miscellaneous Images:**
- Use clear, descriptive names
- Examples: `newLogo.png`, `sponsorBanner.jpg`, `clubPoster.webp`

### Supported Image Formats
- `.webp` (preferred for web performance)
- `.svg` (for logos and graphics)
- `.jpg` or `.jpeg`
- `.png`

## 📅 Managing the Schedule

The website schedule is managed through two files:

### Quick Announcements (schedule.html)
The `schedule.html` page displays events from the `schedule.json` file. You don't need to edit the HTML file directly.

### Adding Events (schedule.json)

The `schedule.json` file controls all events on the schedule page. Here's how to add different types of events:

#### Event Types Available:
- `"meeting"` - Regular meetings
- `"event"` - Special events and activities
- `"tournament"` - Science Olympiad competitions
- `"a"` - Announcements (temporary messages)

#### Basic Event Structure:
```json
{
    "hide": false,
    "type": "event",
    "color": "green",
    "text": "Event Name",
    "location": "Location Name",
    "when": "Date and Time",
    "who": "Who can attend",
    "end": "YYYY-MM-DD",
    "prepare": "What to bring or prepare",
    "cost": "Cost if any",
    "link": "https://elhssoc.com"
}
```

#### Required Fields:
- `"hide"`: Set to `false` to show the event
- `"type"`: Choose from meeting, event, tournament, or a
- `"text"`: The event name/title
- `"end"`: When to stop showing this event (YYYY-MM-DD format)

#### Optional Fields:
- `"color"`: Background color (green, gold, lime, red, etc.)
- `"location"`: Where the event takes place
- `"when"`: Date and time details
- `"who"`: Target audience
- `"prepare"`: Preparation instructions
- `"cost"`: Price information
- `"link"`: Related website URL

#### Examples:

**Tournament:**
```json
{
    "hide": false,
    "type": "tournament",
    "color": "gold",
    "text": "Regional Tournament",
    "location": "Haslett High School, Haslett MI",
    "when": "March 15, 2026",
    "who": "Everyone",
    "end": "2026-03-15",
    "link": "https://www.region11miso.org/",
    "prepare": "Study hard and perfect those builds!"
}
```

**Social Event:**
```json
{
    "hide": false,
    "type": "event",
    "color": "green",
    "text": "Team Ice Cream Social",
    "location": "Local Ice Cream Shop",
    "when": "Friday, October 18, 2025 at 3:30 PM",
    "who": "All club members",
    "end": "2025-10-18",
    "cost": "$5-10 per person"
}
```

**Announcement:**
```json
{
    "hide": false,
    "type": "a",
    "start": "2025-10-01",
    "end": "2025-10-15",
    "color": "var(--color-light)",
    "textColor": "var(--text)",
    "text": "Don't forget to sign up for the upcoming tournament!",
    "priority": 3
}
```

#### Tips for Adding Events:
1. Always set `"hide": false` to make the event visible
2. Use the `"end"` date to automatically remove old events
3. For announcements, use `"start"` and `"end"` dates to control when they appear
4. Place new events in chronological order within the file
5. Copy the format of existing events to maintain consistency

## 📱 Adding Instagram Embeds

To add Instagram posts to the `socials.html` page:

### Step 1: Get the Embed Code
1. Go to the Instagram post you want to embed
2. Click the three dots (...) on the post
3. Select "Embed"
4. Copy the provided embed code

### Step 2: Add to socials.html
1. Open the `socials.html` file
2. Find the section with `class="media-segment"` where you want to add the post
3. Add your Instagram embed code
4. Add spacing after the embed:

```html
<blockquote class="instagram-media" data-instgrm-permalink="YOUR_INSTAGRAM_URL" ...>
    <!-- Instagram embed code goes here -->
</blockquote>
<m-spacer height="8vh"></m-spacer>
```

### Example:
Look at the existing Instagram embeds in `socials.html` for reference. The structure should be:
- Instagram embed code (the `<blockquote>` section)
- Followed by `<m-spacer height="8vh"></m-spacer>` for proper spacing

### Important Notes:
- Only one copy of the Instagram embed script is needed at the bottom of the page
- The script `<script async src="https://www.instagram.com/embed.js"></script>` is already included
- Make sure to place new embeds within the appropriate `media-segment` div

## 🚀 Getting Started

1. **To add images**: Simply place them in the appropriate folder (`images/SO2026/` or `images/misc/`)
2. **To add events**: Edit the `schedule.json` file following the examples above
3. **To add Instagram posts**: Get the embed code and add it to `socials.html`

## 📞 Need Help?

If you need assistance or have questions about contributing:
- Ask Michael!
- Check existing examples in the files for reference
- Make sure to test your changes before committing code to GitHub

## 🔧 Technical Notes for Developers

- The site uses custom web components from m-html-utils
- Events are rendered dynamically from the JSON file
- The site is hosted on GitHub Pages
- Images should be optimized for web (use .webp when possible)

---

*README last updated October 2025*