/**
 * Copy for Unical — SpotPro's own calendar product — and for the four pages
 * Apple, Google Play and Google's OAuth review require to be publicly
 * reachable before the app can ship.
 *
 * Everything the product page and the legal pages say about data lives in
 * `dataHandling` below and is rendered from there in both places. Reviewers
 * compare the privacy policy against Apple's privacy labels and Play's Data
 * safety form, and inconsistencies between them get apps pulled — so the two
 * renders must not be allowed to drift apart by editing one and not the other.
 */

export const unical = {
  name: "Unical",
  tagline: "Every calendar you own, in one place",
  /** The page h1. Carries the product name, which the tagline alone does not —
   *  Google's OAuth reviewer reads this page to judge the calendar access. */
  heroTitle: "Unical: every calendar you own, in one place",
  summary:
    "Unical brings all your Google and Microsoft calendars together on your phone — and writes your changes back to them. Not a viewer: a calendar you can actually work in.",
  platforms: "iOS and Android",
  status: "In review with the app stores",
  /** Drives the "last updated" line on the legal pages. */
  lastUpdated: "21 September 2026",
  /** Machine-readable twin of the above, for the <time> element. */
  lastUpdatedISO: "2026-09-21",
  /** Where the app's own account deletion lives, quoted on two pages. */
  inAppDeletePath: "Settings → Delete Account",
} as const;

export type UnicalFeatureIcon =
  | "accounts"
  | "views"
  | "sync"
  | "events"
  | "reminders"
  | "calendars"
  | "restore"
  | "search";

export type UnicalFeature = {
  title: string;
  icon: UnicalFeatureIcon;
  /** One plain sentence. Some features are carried entirely by their points. */
  summary?: string;
  points?: string[];
};

/**
 * All shipped and tested in v1. Worded plainly so the same lines can go into
 * the App Store and Play listings without a rewrite — the page and the two
 * listings should describe the same product in the same words.
 */
export const unicalFeatures: UnicalFeature[] = [
  {
    title: "One calendar for everything",
    icon: "accounts",
    summary:
      "Connect as many Google and Microsoft accounts as you like and see them together.",
    points: [
      "Every calendar in each account, not just the main one",
      "Each calendar keeps its own colour",
      "Add or remove accounts at any time",
    ],
  },
  {
    title: "Four ways to look at your time",
    icon: "views",
    summary: "Month, year, day and list — switch with one tap.",
    points: [
      "Month grid you swipe through",
      "Day timeline with a live now line",
      "List view grouped by day",
      "Year overview of twelve months",
    ],
  },
  {
    title: "Two-way sync",
    icon: "sync",
    summary:
      "What you change in Unical changes in Google Calendar and Outlook.",
    points: [
      "Create an event straight onto a connected calendar",
      "Edit and delete events that came from Google or Microsoft",
    ],
  },
  {
    title: "Events with the details that matter",
    icon: "events",
    points: [
      "Repeat daily, weekly, fortnightly, monthly or yearly",
      "Alerts from the time of the event up to a day before",
      "Travel time, shown as a block before the event",
      "All-day and multi-day events",
      "A colour per event, or the calendar's own",
    ],
  },
  {
    title: "Reminders that keep up",
    icon: "reminders",
    points: [
      "Tick them off from the day view",
      "Repeating reminders roll to their next date instead of ending",
      "Mark one urgent",
      "Timed reminders notify you",
    ],
  },
  {
    title: "Your calendars, your way",
    icon: "calendars",
    points: [
      "Show or hide any calendar, yours or a connected one",
      "Create, rename, recolour and delete your own calendars and lists",
      "Hidden calendars disappear from every view and from search",
    ],
  },
  {
    title: "Alerts that survive a new phone",
    icon: "restore",
    summary:
      "Alerts are rebuilt from your account every time the app opens, so reinstalling or switching phones doesn't lose them.",
  },
  {
    title: "Search and settings",
    icon: "search",
    points: [
      "Search events and reminders by title, place or notes",
      "Change your password, log out, delete your account",
      "Automatic light and dark mode",
    ],
  },
];

/**
 * Deliberately not in v1. Published so the page never promises them, and so
 * there is an honest answer when someone asks what is coming.
 */
export const unicalRoadmap: Array<{ title: string; description: string }> = [
  {
    title: "Invitations inbox",
    description:
      "Replying to meeting invites. Planned as its own release rather than squeezed into this one.",
  },
  {
    title: "Invitees on events",
    description: "Inviting people belongs with the invitations work.",
  },
  {
    title: "Forgot-password email",
    description:
      "Changing your password works today. Resetting a forgotten one needs an email sender we have not set up yet.",
  },
  {
    title: "Attachments",
    description: "Needs file storage, which v1 does not have.",
  },
  {
    title: "Shared calendars of our own",
    description:
      "Sharing happens in Google or Microsoft, and Unical respects what you set there.",
  },
  {
    title: "Web and desktop",
    description: "Phone only for now.",
  },
];

export type DataHandlingRow = {
  what: string;
  why: string;
  where: string;
  /** Rows that state a limit rather than a practice. Rendered emphasised. */
  emphasis?: boolean;
};

/**
 * The source of truth for the data table. Rendered on the product page and
 * again in the privacy policy. It must also match, in substance, Apple's
 * privacy labels and Play's Data safety form — change it here, then go and
 * change those two.
 */
export const dataHandling: DataHandlingRow[] = [
  {
    what: "Name, email, password",
    why: "Your Unical account",
    where: "Our database. Passwords are hashed, never stored as text.",
  },
  {
    what: "Google and Microsoft access tokens",
    why: "To read and update your calendars",
    where:
      "Our database, encrypted. Removed when you disconnect the account or delete yours.",
  },
  {
    what: "Events and reminders you create in Unical",
    why: "The app's own calendars and lists",
    where: "Our database.",
  },
  {
    what: "Your Google and Microsoft events",
    why: "To show them in the app",
    where:
      "Never stored. Fetched from the provider each time you open a view, and discarded after.",
    emphasis: true,
  },
  {
    what: "Names and colours of your connected calendars",
    why: "To list them, and to remember which ones you hid",
    where: "Our database.",
  },
  {
    what: "Analytics, advertising, location, contacts",
    why: "—",
    where:
      "None collected. Unical contains no analytics and no advertising libraries.",
    emphasis: true,
  },
];

/** Quoted verbatim in the privacy policy; Google's reviewer looks for it. */
export const limitedUseStatement =
  "Unical's use of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.";

export type LegalSection = {
  heading: string;
  body?: string[];
  list?: string[];
  /** Renders the shared data table inside this section. */
  table?: boolean;
  /** Renders as a pull quote rather than body copy. */
  quote?: string;
};

export const privacyPolicy = {
  title: "Unical Privacy Policy",
  intro:
    "This policy covers the Unical mobile app and the service behind it. It describes what the app handles, why, where it is kept, and how to get rid of it.",
  sections: [
    {
      heading: "Who we are",
      body: [
        "Unical is built and operated by SpotPro Solutions. Where this policy says we or us, it means SpotPro Solutions.",
      ],
    },
    {
      heading: "What Unical handles",
      body: [
        "This is the complete list. Anything not named here, Unical does not collect.",
      ],
      table: true,
    },
    {
      heading: "Your calendar events are not copied to us",
      body: [
        "When you open a day, a month or a search, Unical asks Google or Microsoft for the events in that range, shows them, and discards them. They are not written to our database and they are not retained after the view closes.",
        "The exception is anything you create in Unical's own calendars and lists, which has nowhere else to live and is stored with your account.",
      ],
    },
    {
      heading: "Google user data and Limited Use",
      body: [
        "Unical requests access to your Google Calendar so it can list your calendars and read, create, edit and delete your events — the things the app visibly does, and nothing beyond them.",
      ],
      quote:
        "Unical's use of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.",
    },
    {
      heading: "Who we share it with",
      body: [
        "No one. We do not sell your data, we do not share it with advertisers, and we do not use it to train models. The only third parties involved are Google and Microsoft, because they are the source of the calendars you asked us to connect.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "Your account data stays until you delete your account. Access tokens are removed the moment you disconnect an account. Deleting your account removes everything and revokes our access at Google.",
      ],
    },
    {
      heading: "Deleting your data",
      body: [
        "You can delete your account from inside the app, and if you have already uninstalled it you can ask us to do it for you.",
      ],
    },
    {
      heading: "Security",
      body: [
        "Passwords are hashed. Access tokens are encrypted at rest. Traffic between the app and our service is encrypted in transit.",
      ],
    },
    {
      heading: "Children",
      body: [
        "Unical is not directed at children and we do not knowingly create accounts for them.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: [
        "If this policy changes in a way that affects what we handle, we will update this page and the date at the top of it.",
      ],
    },
  ] satisfies LegalSection[],
};

export const terms = {
  title: "Unical Terms and Conditions",
  intro:
    "These terms cover your use of the Unical mobile app and the service behind it.",
  sections: [
    {
      heading: "Who provides the service",
      body: [
        "Unical is provided by SpotPro Solutions. By creating an account you agree to these terms.",
      ],
    },
    {
      heading: "Your account",
      body: [
        "You are responsible for keeping your password to yourself and for what happens under your account. Tell us if you think someone else has access to it.",
      ],
    },
    {
      heading: "Connected accounts",
      body: [
        "Connecting a Google or Microsoft account grants Unical permission to read and change the calendars in it. You can withdraw that at any time by disconnecting the account in the app, or from your Google or Microsoft account settings.",
        "Your use of Google and Microsoft remains governed by their own terms. We are not responsible for their availability, and an outage on their side will affect what Unical can show you.",
      ],
    },
    {
      heading: "Acceptable use",
      list: [
        "Do not use Unical for anything unlawful",
        "Do not attempt to access another person's account or data",
        "Do not interfere with the service, probe it, or overload it",
        "Do not resell or redistribute the service without our written agreement",
      ],
    },
    {
      heading: "Availability",
      body: [
        "We aim to keep Unical running but we do not guarantee uninterrupted service. We may change, suspend or withdraw features, and we will give notice where a change materially affects how you use the app.",
      ],
    },
    {
      heading: "Liability",
      body: [
        "Unical is provided as is. To the extent the law allows, we are not liable for indirect or consequential loss, or for loss arising from missed events, failed syncs or data held by Google or Microsoft. Nothing here limits liability that cannot lawfully be limited.",
      ],
    },
    {
      heading: "Ending your use",
      body: [
        "You can stop using Unical at any time and delete your account from inside the app. We may suspend or close an account that breaches these terms.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        "These terms are governed by the laws of India, and the courts of India have jurisdiction over any dispute arising from them.",
      ],
    },
    {
      heading: "Contact",
      body: ["Questions about these terms can go to our support address."],
    },
  ] satisfies LegalSection[],
};

export const deleteAccount = {
  title: "Delete your Unical account",
  intro:
    "You can delete your Unical account and everything in it. This page explains how, and exactly what gets removed.",
  /** Play requires this reachable without installing the app or logging in. */
  inAppSteps: [
    "Open Unical and go to Settings.",
    "Choose Delete Account.",
    "Confirm. The account and its data are removed immediately.",
  ],
  removed: [
    "Your name, email and password",
    "Every event and reminder you created in Unical's own calendars and lists",
    "The calendars and lists you created",
    "Your stored Google and Microsoft access tokens, and our access to those accounts is revoked",
    "Which calendars you had hidden, and their saved names and colours",
  ],
  notRemoved: [
    "Events that live in Google Calendar or Outlook. Those are yours and stay where they are — Unical never held a copy to delete.",
  ],
  uninstalled: {
    heading: "Already uninstalled the app?",
    body: "Email us from the address on your Unical account and ask for it to be deleted. We will confirm once it is done. If you can still install the app, deleting from inside it is immediate and needs no waiting.",
  },
  retention:
    "Deletion is immediate and is not reversible. Backups holding the deleted records are rotated out within 30 days.",
};

export const support = {
  title: "Unical support",
  intro:
    "Something not working, or a question the app does not answer? Here is how to reach a person.",
  topics: [
    {
      heading: "A calendar is not showing up",
      body: "Check it is not hidden in Settings, then disconnect and reconnect the account. Unical reads the calendar list fresh each time you connect.",
    },
    {
      heading: "Your work account will not connect",
      body: "Some organisations require their own IT administrator to approve new apps before staff can connect a Microsoft work account. If you see a message about needing admin approval, that approval sits with your organisation, not with us.",
    },
    {
      heading: "You forgot your password",
      body: "Password reset by email is not in this release. Contact us and we will help you get back in.",
    },
    {
      heading: "You want your account deleted",
      body: "Delete it from inside the app under Settings, or ask us if you have already uninstalled it.",
    },
  ],
};
