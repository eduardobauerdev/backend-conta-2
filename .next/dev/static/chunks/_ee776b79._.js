(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center px-6 [.border-t]:pt-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/checkbox.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>Checkbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-checkbox/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function Checkbox({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "checkbox",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "checkbox-indicator",
            className: "flex items-center justify-center text-current transition-none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                className: "size-3.5"
            }, void 0, false, {
                fileName: "[project]/components/ui/checkbox.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ui/checkbox.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/checkbox.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = Checkbox;
;
var _c;
__turbopack_context__.k.register(_c, "Checkbox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Label;
;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/textarea.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
function Textarea({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        "data-slot": "textarea",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/textarea.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Textarea;
;
var _c;
__turbopack_context__.k.register(_c, "Textarea");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/separator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Separator",
    ()=>Separator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-separator/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function Separator({ className, orientation = 'horizontal', decorative = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "separator",
        decorative: decorative,
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/separator.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = Separator;
;
var _c;
__turbopack_context__.k.register(_c, "Separator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/forms/ordem-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrdemForm",
    ()=>OrdemForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/checkbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eraser.js [app-client] (ecmascript) <export default as Eraser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code.js [app-client] (ecmascript) <export default as Code>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const numberToWords = (num)=>{
    const words = {
        1: "uma",
        2: "duas",
        3: "três",
        4: "quatro",
        5: "cinco",
        6: "seis",
        7: "sete",
        8: "oito",
        9: "nove",
        10: "dez",
        11: "onze",
        12: "doze",
        13: "treze",
        14: "quatorze",
        15: "quinze",
        16: "dezesseis",
        17: "dezessete",
        18: "dezoito",
        19: "dezenove",
        20: "vinte"
    };
    return words[num] || num.toString();
};
const formatCurrency = (value)=>{
    const numbers = value.replace(/\D/g, "");
    if (!numbers) return "";
    const amount = Number.parseFloat(numbers) / 100;
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(amount);
};
const formatPhone = (value)=>{
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
        return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
};
const formatCPF = (value)=>{
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4").replace(/-$/, "");
};
const createEmptyAmbiente = ()=>({
        ambiente: "",
        tipo_piso: "",
        medidas: "",
        inox: {
            acabamento: [],
            passamao: [],
            tubos: [],
            flags: {
                com_uniao_sim: false,
                com_uniao_nao: false,
                uniao_com_curva_sim: false,
                uniao_com_curva_nao: false,
                inicio_com_curva_sim: false,
                inicio_com_curva_nao: false,
                final_com_curva_sim: false,
                final_com_curva_nao: false,
                pinado_sim: false,
                pinado_nao: false
            }
        },
        hastes: {
            tipo: [],
            fixacao: {
                lateral: false,
                superior: false,
                flange: false,
                tarugo_padrao: false
            }
        },
        intermediarios: {
            tipo: [],
            com_uniao: false,
            transpassado: false
        },
        vidro: {
            acabamento_superior: [],
            tubos: [],
            fixacao: [],
            acabamento: [],
            tipo: [],
            espessura: []
        },
        anexos: []
    });
function OrdemForm({ onSave }) {
    _s();
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isDataHojeVisita, setIsDataHojeVisita] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showLoadingModal, setShowLoadingModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoadingComplete, setIsLoadingComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showClearFieldsToast, setShowClearFieldsToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCopyToast, setShowCopyToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [isOrdemSalva, setIsOrdemSalva] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        cliente: "",
        ordem_producao: "",
        tipo_os: [],
        endereco: "",
        cidade: "",
        celular: "",
        data_hora_visita: "",
        vendedor: "",
        informacoes_complementares: "",
        ambientes: [
            createEmptyAmbiente()
        ],
        anexos_gerais: []
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrdemForm.useEffect": ()=>{
            const today = new Date().toISOString().split('T')[0];
            setFormData({
                "OrdemForm.useEffect": (prev)=>({
                        ...prev,
                        data_hora_visita: today
                    })
            }["OrdemForm.useEffect"]);
        }
    }["OrdemForm.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrdemForm.useEffect": ()=>{
            if (showClearFieldsToast) {
                const timer = setTimeout({
                    "OrdemForm.useEffect.timer": ()=>{
                        setShowClearFieldsToast(false);
                    }
                }["OrdemForm.useEffect.timer"], 5000);
                return ({
                    "OrdemForm.useEffect": ()=>clearTimeout(timer)
                })["OrdemForm.useEffect"];
            }
        }
    }["OrdemForm.useEffect"], [
        showClearFieldsToast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrdemForm.useEffect": ()=>{
            if (showCopyToast) {
                const timer = setTimeout({
                    "OrdemForm.useEffect.timer": ()=>{
                        setShowCopyToast(false);
                    }
                }["OrdemForm.useEffect.timer"], 3000);
                return ({
                    "OrdemForm.useEffect": ()=>clearTimeout(timer)
                })["OrdemForm.useEffect"];
            }
        }
    }["OrdemForm.useEffect"], [
        showCopyToast
    ]);
    const [contratoData, setContratoData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({}) // Placeholder for contratoData
    ;
    const [gerarContrato, setGerarContrato] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false) // Placeholder for gerarContrato
    ;
    const [tipoContrato, setTipoContrato] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("") // Placeholder for tipoContrato
    ;
    const [fileNames, setFileNames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const handleInputChange = (field, value)=>{
        setFormData((prev)=>({
                ...prev,
                [field]: value
            }));
        if (errors[field]) {
            setErrors((prev)=>({
                    ...prev,
                    [field]: ""
                }));
        }
    };
    const handleContratoInputChange = (field, value)=>{
        let formattedValue = value;
        // Apply formatting based on field type
        if (field === "telefone") {
            formattedValue = formatPhone(value);
        } else if (field === "cpf") {
            formattedValue = formatCPF(value);
        } else if (field === "valor_produtos_instalacao" || field === "valor_entrada" || field === "valor_desconto") {
            formattedValue = formatCurrency(value);
        }
        setContratoData((prev)=>({
                ...prev,
                [field]: formattedValue
            }));
        if (errors[field]) {
            setErrors((prev)=>({
                    ...prev,
                    [field]: ""
                }));
        }
    };
    const handleAmbienteChange = (ambienteIndex, field, value)=>{
        setFormData((prev)=>({
                ...prev,
                ambientes: prev.ambientes.map((amb, idx)=>idx === ambienteIndex ? {
                        ...amb,
                        [field]: value
                    } : amb)
            }));
    };
    const handleCheckboxArray = (ambienteIndex, section, field, value, checked)=>{
        setFormData((prev)=>({
                ...prev,
                ambientes: prev.ambientes.map((ambiente, idx)=>{
                    if (idx !== ambienteIndex) return ambiente;
                    const currentSection = ambiente[section];
                    const currentArray = currentSection[field];
                    return {
                        ...ambiente,
                        [section]: {
                            ...currentSection,
                            [field]: checked ? [
                                ...currentArray,
                                value
                            ] : currentArray.filter((v)=>v !== value)
                        }
                    };
                })
            }));
    };
    const handleTopLevelCheckbox = (field, value, checked)=>{
        setFormData((prev)=>({
                ...prev,
                [field]: checked ? [
                    ...prev[field],
                    value
                ] : prev[field].filter((v)=>v !== value)
            }));
        if (field === "tipo_os" && errors.tipo_os) {
            setErrors((prev)=>({
                    ...prev,
                    tipo_os: ""
                }));
        }
    };
    const handleBooleanFlag = (ambienteIndex, section, field, checked)=>{
        setFormData((prev)=>({
                ...prev,
                ambientes: prev.ambientes.map((ambiente, idx)=>{
                    if (idx !== ambienteIndex) return ambiente;
                    if (section === "inox") {
                        return {
                            ...ambiente,
                            inox: {
                                ...ambiente.inox,
                                flags: {
                                    ...ambiente.inox.flags,
                                    [field]: checked
                                }
                            }
                        };
                    } else {
                        const currentSection = ambiente[section];
                        return {
                            ...ambiente,
                            [section]: {
                                ...currentSection,
                                [field]: checked
                            }
                        };
                    }
                })
            }));
    };
    const handleHasteFixacaoChange = (ambienteIndex, field, checked)=>{
        setFormData((prev)=>({
                ...prev,
                ambientes: prev.ambientes.map((ambiente, idx)=>idx === ambienteIndex ? {
                        ...ambiente,
                        hastes: {
                            ...ambiente.hastes,
                            fixacao: {
                                ...ambiente.hastes.fixacao,
                                [field]: checked
                            }
                        }
                    } : ambiente)
            }));
    };
    const handleFileChange = (e)=>{
        const files = e.target.files;
        if (files) {
            const names = Array.from(files).map((f)=>f.name);
            setFileNames(names);
            setFormData((prev)=>({
                    ...prev,
                    anexos_gerais: names
                }));
        }
    };
    const handleAddAmbiente = ()=>{
        if (formData.ambientes.length < 3) {
            setFormData((prev)=>({
                    ...prev,
                    ambientes: [
                        ...prev.ambientes,
                        createEmptyAmbiente()
                    ]
                }));
        }
    };
    const handleRemoveAmbiente = (index)=>{
        if (formData.ambientes.length > 1) {
            setFormData((prev)=>({
                    ...prev,
                    ambientes: prev.ambientes.filter((_, idx)=>idx !== index)
                }));
        }
    };
    const validateForm = ()=>{
        const newErrors = {};
        if (!formData.cliente.trim()) {
            newErrors.cliente = "Informe o cliente.";
        }
        if (formData.tipo_os.length === 0) {
            newErrors.tipo_os = "Selecione ao menos uma opção.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const pollForCallback = async (id)=>{
        const maxAttempts = 60;
        let attempts = 0;
        const poll = async ()=>{
            if (attempts >= maxAttempts) {
                return null;
            }
            try {
                const response = await fetch(`/api/callback/check/${id}`);
                const result = await response.json();
                if (result.driveLink) {
                    return result.driveLink;
                }
                await new Promise((resolve)=>setTimeout(resolve, 5000));
                attempts++;
                return poll();
            } catch (error) {
                console.error("[v0] Error polling for callback:", error);
                await new Promise((resolve)=>setTimeout(resolve, 5000));
                attempts++;
                return poll();
            }
        };
        return poll();
    };
    const buildCompletePayload = ()=>{
        const toNullIfEmpty = (val)=>val && val.trim() !== "" ? val : " ";
        const toBooleanOrNull = (val)=>val === true ? "X" : " ";
        // Helper function to build flattened ambiente payload
        const buildAmbientePayload = (ambiente, prefix)=>({
                [`${prefix}_ambiente`]: toNullIfEmpty(ambiente.ambiente),
                [`${prefix}_tipo_piso`]: toNullIfEmpty(ambiente.tipo_piso),
                [`${prefix}_medidas`]: toNullIfEmpty(ambiente.medidas),
                [`${prefix}_inox_acabamento_polido`]: toBooleanOrNull(ambiente.inox.acabamento.includes("polido")),
                [`${prefix}_inox_acabamento_escovado`]: toBooleanOrNull(ambiente.inox.acabamento.includes("escovado")),
                [`${prefix}_inox_acabamento_pintado`]: toBooleanOrNull(ambiente.inox.acabamento.includes("pintado")),
                [`${prefix}_inox_passamao_simples`]: toBooleanOrNull(ambiente.inox.passamao.includes("simples")),
                [`${prefix}_inox_passamao_duplo`]: toBooleanOrNull(ambiente.inox.passamao.includes("duplo")),
                [`${prefix}_inox_tubos_1_1_2`]: toBooleanOrNull(ambiente.inox.tubos.includes("1_1_2")),
                [`${prefix}_inox_tubos_1`]: toBooleanOrNull(ambiente.inox.tubos.includes("1")),
                [`${prefix}_inox_tubos_30x30`]: toBooleanOrNull(ambiente.inox.tubos.includes("30x30")),
                [`${prefix}_inox_tubos_40x10`]: toBooleanOrNull(ambiente.inox.tubos.includes("40x10")),
                [`${prefix}_inox_com_uniao_sim`]: toBooleanOrNull(ambiente.inox.flags.com_uniao_sim),
                [`${prefix}_inox_com_uniao_nao`]: toBooleanOrNull(ambiente.inox.flags.com_uniao_nao),
                [`${prefix}_inox_uniao_com_curva_sim`]: toBooleanOrNull(ambiente.inox.flags.uniao_com_curva_sim),
                [`${prefix}_inox_uniao_com_curva_nao`]: toBooleanOrNull(ambiente.inox.flags.uniao_com_curva_nao),
                [`${prefix}_inox_inicio_com_curva_sim`]: toBooleanOrNull(ambiente.inox.flags.inicio_com_curva_sim),
                [`${prefix}_inox_inicio_com_curva_nao`]: toBooleanOrNull(ambiente.inox.flags.inicio_com_curva_nao),
                [`${prefix}_inox_final_com_curva_sim`]: toBooleanOrNull(ambiente.inox.flags.final_com_curva_sim),
                [`${prefix}_inox_final_com_curva_nao`]: toBooleanOrNull(ambiente.inox.flags.final_com_curva_nao),
                [`${prefix}_inox_pinado_sim`]: toBooleanOrNull(ambiente.inox.flags.pinado_sim),
                [`${prefix}_inox_pinado_nao`]: toBooleanOrNull(ambiente.inox.flags.pinado_nao),
                [`${prefix}_hastes_tipo_1_1_2`]: toBooleanOrNull(ambiente.hastes.tipo.includes("1_1_2")),
                [`${prefix}_hastes_tipo_1`]: toBooleanOrNull(ambiente.hastes.tipo.includes("1")),
                [`${prefix}_hastes_tipo_30x30`]: toBooleanOrNull(ambiente.hastes.tipo.includes("30x30")),
                [`${prefix}_hastes_tipo_40x10`]: toBooleanOrNull(ambiente.hastes.tipo.includes("40x10")),
                [`${prefix}_hastes_fixacao_lateral`]: toBooleanOrNull(ambiente.hastes.fixacao.lateral),
                [`${prefix}_hastes_fixacao_superior`]: toBooleanOrNull(ambiente.hastes.fixacao.superior),
                [`${prefix}_hastes_fixacao_flange`]: toBooleanOrNull(ambiente.hastes.fixacao.flange),
                [`${prefix}_hastes_fixacao_tarugo_padrao`]: toBooleanOrNull(ambiente.hastes.fixacao.tarugo_padrao),
                [`${prefix}_intermediarios_tipo_1_2`]: toBooleanOrNull(ambiente.intermediarios.tipo.includes("1_2")),
                [`${prefix}_intermediarios_tipo_5_8`]: toBooleanOrNull(ambiente.intermediarios.tipo.includes("5_8")),
                [`${prefix}_intermediarios_tipo_cabo_de_aco`]: toBooleanOrNull(ambiente.intermediarios.tipo.includes("cabo_de_aco")),
                [`${prefix}_intermediarios_com_uniao`]: toBooleanOrNull(ambiente.intermediarios.com_uniao),
                [`${prefix}_intermediarios_transpassado`]: toBooleanOrNull(ambiente.intermediarios.transpassado),
                [`${prefix}_vidro_acab_sup_passamao`]: toBooleanOrNull(ambiente.vidro.acabamento_superior.includes("passamao")),
                [`${prefix}_vidro_acab_sup_perfil`]: toBooleanOrNull(ambiente.vidro.acabamento_superior.includes("perfil")),
                [`${prefix}_vidro_tubos_1_1_2`]: toBooleanOrNull(ambiente.vidro.tubos.includes("1_1_2")),
                [`${prefix}_vidro_tubos_1`]: toBooleanOrNull(ambiente.vidro.tubos.includes("1")),
                [`${prefix}_vidro_tubos_30x30`]: toBooleanOrNull(ambiente.vidro.tubos.includes("30x30")),
                [`${prefix}_vidro_tubos_40x10`]: toBooleanOrNull(ambiente.vidro.tubos.includes("40x10")),
                [`${prefix}_vidro_fixacao_pinca`]: toBooleanOrNull(ambiente.vidro.fixacao.includes("pinca")),
                [`${prefix}_vidro_fixacao_orelha`]: toBooleanOrNull(ambiente.vidro.fixacao.includes("orelha")),
                [`${prefix}_vidro_fixacao_baguete`]: toBooleanOrNull(ambiente.vidro.fixacao.includes("baguete")),
                [`${prefix}_vidro_fixacao_botons`]: toBooleanOrNull(ambiente.vidro.fixacao.includes("botons")),
                [`${prefix}_vidro_acabamento_polido`]: toBooleanOrNull(ambiente.vidro.acabamento.includes("polido")),
                [`${prefix}_vidro_acabamento_escovado`]: toBooleanOrNull(ambiente.vidro.acabamento.includes("escovado")),
                [`${prefix}_vidro_acabamento_pintado`]: toBooleanOrNull(ambiente.vidro.acabamento.includes("pintado")),
                [`${prefix}_vidro_tipo_temperado`]: toBooleanOrNull(ambiente.vidro.tipo.includes("temperado")),
                [`${prefix}_vidro_tipo_laminado`]: toBooleanOrNull(ambiente.vidro.tipo.includes("laminado")),
                [`${prefix}_vidro_esp_8mm`]: toBooleanOrNull(ambiente.vidro.espessura.includes("8mm")),
                [`${prefix}_vidro_esp_10mm`]: toBooleanOrNull(ambiente.vidro.espessura.includes("10mm")),
                [`${prefix}_vidro_esp_5_5mm`]: toBooleanOrNull(ambiente.vidro.espessura.includes("5+5mm")),
                [`${prefix}_anexos`]: ambiente.anexos || []
            });
        // Build empty ambiente with all keys as " " (empty space)
        const buildEmptyAmbientePayload = (prefix)=>({
                [`${prefix}_ambiente`]: " ",
                [`${prefix}_tipo_piso`]: " ",
                [`${prefix}_medidas`]: " ",
                [`${prefix}_inox_acabamento_polido`]: " ",
                [`${prefix}_inox_acabamento_escovado`]: " ",
                [`${prefix}_inox_acabamento_pintado`]: " ",
                [`${prefix}_inox_passamao_simples`]: " ",
                [`${prefix}_inox_passamao_duplo`]: " ",
                [`${prefix}_inox_tubos_1_1_2`]: " ",
                [`${prefix}_inox_tubos_1`]: " ",
                [`${prefix}_inox_tubos_30x30`]: " ",
                [`${prefix}_inox_tubos_40x10`]: " ",
                [`${prefix}_inox_com_uniao_sim`]: " ",
                [`${prefix}_inox_com_uniao_nao`]: " ",
                [`${prefix}_inox_uniao_com_curva_sim`]: " ",
                [`${prefix}_inox_uniao_com_curva_nao`]: " ",
                [`${prefix}_inox_inicio_com_curva_sim`]: " ",
                [`${prefix}_inox_inicio_com_curva_nao`]: " ",
                [`${prefix}_inox_final_com_curva_sim`]: " ",
                [`${prefix}_inox_final_com_curva_nao`]: " ",
                [`${prefix}_inox_pinado_sim`]: " ",
                [`${prefix}_inox_pinado_nao`]: " ",
                [`${prefix}_hastes_tipo_1_1_2`]: " ",
                [`${prefix}_hastes_tipo_1`]: " ",
                [`${prefix}_hastes_tipo_30x30`]: " ",
                [`${prefix}_hastes_tipo_40x10`]: " ",
                [`${prefix}_hastes_fixacao_lateral`]: " ",
                [`${prefix}_hastes_fixacao_superior`]: " ",
                [`${prefix}_hastes_fixacao_flange`]: " ",
                [`${prefix}_hastes_fixacao_tarugo_padrao`]: " ",
                [`${prefix}_intermediarios_tipo_1_2`]: " ",
                [`${prefix}_intermediarios_tipo_5_8`]: " ",
                [`${prefix}_intermediarios_tipo_cabo_de_aco`]: " ",
                [`${prefix}_intermediarios_com_uniao`]: " ",
                [`${prefix}_intermediarios_transpassado`]: " ",
                [`${prefix}_vidro_acab_sup_passamao`]: " ",
                [`${prefix}_vidro_acab_sup_perfil`]: " ",
                [`${prefix}_vidro_tubos_1_1_2`]: " ",
                [`${prefix}_vidro_tubos_1`]: " ",
                [`${prefix}_vidro_tubos_30x30`]: " ",
                [`${prefix}_vidro_tubos_40x10`]: " ",
                [`${prefix}_vidro_fixacao_pinca`]: " ",
                [`${prefix}_vidro_fixacao_orelha`]: " ",
                [`${prefix}_vidro_fixacao_baguete`]: " ",
                [`${prefix}_vidro_fixacao_botons`]: " ",
                [`${prefix}_vidro_acabamento_polido`]: " ",
                [`${prefix}_vidro_acabamento_escovado`]: " ",
                [`${prefix}_vidro_acabamento_pintado`]: " ",
                [`${prefix}_vidro_tipo_temperado`]: " ",
                [`${prefix}_vidro_tipo_laminado`]: " ",
                [`${prefix}_vidro_esp_8mm`]: " ",
                [`${prefix}_vidro_esp_10mm`]: " ",
                [`${prefix}_vidro_esp_5_5mm`]: " ",
                [`${prefix}_anexos`]: []
            });
        const buildContratoPayload = ()=>{
            if (!gerarContrato || tipoContrato !== "fisica") return {};
            let quantidadeParcelasFormatted = "";
            if (contratoData.quantidade_parcelas) {
                const numParcelas = Number.parseInt(contratoData.quantidade_parcelas, 10);
                if (!isNaN(numParcelas)) {
                    quantidadeParcelasFormatted = `${numParcelas} (${numberToWords(numParcelas)})`;
                }
            }
            return {
                contrato_tipo_projeto: contratoData.tipo_projeto || "",
                contrato_nome: contratoData.nome || "",
                contrato_telefone: contratoData.telefone || "",
                contrato_endereco: contratoData.endereco_contrato || "",
                contrato_cpf: contratoData.cpf || "",
                contrato_forma_pagamento: contratoData.forma_pagamento || "",
                contrato_valor_produtos_instalacao: contratoData.valor_produtos_instalacao || "",
                contrato_valor_entrada: contratoData.valor_entrada || "",
                contrato_valor_desconto: contratoData.valor_desconto || "",
                contrato_quantidade_parcelas: quantidadeParcelasFormatted || "",
                contrato_forma_pagamento_parcelas: contratoData.forma_pagamento_parcelas || "",
                contrato_observacao_pagamento: contratoData.observacao_pagamento || ""
            };
        };
        const payload = {
            cabecalho: {
                cliente: formData.cliente,
                ordem_producao: toNullIfEmpty(formData.ordem_producao),
                tipo_os_visita: toBooleanOrNull(formData.tipo_os.includes("visita")),
                tipo_os_molde: toBooleanOrNull(formData.tipo_os.includes("molde")),
                tipo_os_instalacao: toBooleanOrNull(formData.tipo_os.includes("instalacao")),
                endereco: toNullIfEmpty(formData.endereco),
                cidade: toNullIfEmpty(formData.cidade),
                celular: toNullIfEmpty(formData.celular),
                data_hora_visita: toNullIfEmpty(formData.data_hora_visita),
                vendedor: toNullIfEmpty(formData.vendedor),
                informacoes_complementares: toNullIfEmpty(formData.informacoes_complementares)
            },
            ...formData.ambientes[0] ? buildAmbientePayload(formData.ambientes[0], "a1") : buildEmptyAmbientePayload("a1"),
            ...formData.ambientes[1] ? buildAmbientePayload(formData.ambientes[1], "a2") : buildEmptyAmbientePayload("a2"),
            ...formData.ambientes[2] ? buildAmbientePayload(formData.ambientes[2], "a3") : buildEmptyAmbientePayload("a3")
        };
        return payload;
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (validateForm()) {
            const completePayload = buildCompletePayload();
            setShowLoadingModal(true);
            setIsLoadingComplete(false);
            setCountdown(10);
            try {
                console.log("[v0] Enviando ordem de serviço para n8n...");
                console.log("[v0] Payload:", JSON.stringify(completePayload, null, 2));
                const url = "https://edubauerdev.app.n8n.cloud/webhook-test/os-criar";
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify(completePayload)
                });
                if (!res.ok) {
                    const errorText = await res.text().catch(()=>"-");
                    console.error("[v0] Failed to send to n8n:", res.status, errorText);
                    alert("Erro ao enviar ordem de serviço. Verifique o console para mais detalhes.");
                    setShowLoadingModal(false);
                    return;
                }
                const result = await res.json();
                console.log("[v0] Successfully sent to n8n:", result);
                setIsOrdemSalva(true);
                onSave(formData);
            } catch (err) {
                console.error("[v0] Network error sending to n8n:", err);
                alert("Erro de rede ao enviar ordem de serviço. Verifique sua conexão.");
            } finally{
                const countdownInterval = setInterval(()=>{
                    setCountdown((prev)=>{
                        if (prev <= 1) {
                            clearInterval(countdownInterval);
                            setIsLoadingComplete(true);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
        }
    };
    const DRIVE_LINK = 'https://drive.google.com/drive/u/0/folders/1ZteBVMAVJhUbdj5bRg2UI78SeeGjzRFK';
    const handleCloseModal = ()=>{
        setShowLoadingModal(false);
        setShowClearFieldsToast(true);
        setIsOrdemSalva(false);
        setFormData({
            cliente: "",
            ordem_producao: "",
            tipo_os: [],
            endereco: "",
            cidade: "",
            celular: "",
            data_hora_visita: new Date().toISOString().split('T')[0],
            vendedor: "",
            informacoes_complementares: "",
            ambientes: [
                createEmptyAmbiente()
            ],
            anexos_gerais: []
        });
        setFileNames([]);
    };
    const handleCopyValue = async (value)=>{
        const textToCopy = typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value);
        try {
            await navigator.clipboard.writeText(textToCopy);
            setShowCopyToast(true);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };
    const truncateValue = (value)=>{
        const str = typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value);
        return str.length > 30 ? `${str.substring(0, 30)}...` : str;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            showLoadingModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-6 w-[400px] min-h-[340px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleCloseModal,
                            className: "absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors",
                            "aria-label": "Fechar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/ordem-form.tsx",
                                lineNumber: 662,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/forms/ordem-form.tsx",
                            lineNumber: 657,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-20 relative flex-shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/google_drive.svg",
                                alt: "Google Drive",
                                className: `w-full h-full object-contain drop-shadow-lg transition-all duration-500`,
                                style: {
                                    filter: !isLoadingComplete ? 'grayscale(100%)' : 'none'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/forms/ordem-form.tsx",
                                lineNumber: 666,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/forms/ordem-form.tsx",
                            lineNumber: 665,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-4 flex-1 justify-center",
                            style: {
                                minHeight: '140px'
                            },
                            children: !isLoadingComplete ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "w-8 h-8 animate-spin text-blue-600"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 677,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-semibold text-neutral-900",
                                        children: "Gerando ordem de serviço..."
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 678,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-neutral-600 text-center",
                                        children: [
                                            "Gerando seu documento em ",
                                            countdown,
                                            " segundos"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 679,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-semibold text-green-600",
                                        children: "Seu arquivo está pronto"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 683,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: DRIVE_LINK,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-5 h-5",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 691,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/ordem-form.tsx",
                                                lineNumber: 690,
                                                columnNumber: 21
                                            }, this),
                                            "Acessar pasta do arquivo"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 684,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/components/forms/ordem-form.tsx",
                            lineNumber: 674,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/forms/ordem-form.tsx",
                    lineNumber: 656,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/forms/ordem-form.tsx",
                lineNumber: 655,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed bottom-6 right-6 z-50 transition-all duration-500 ${showClearFieldsToast ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`,
                style: {
                    maxHeight: '120px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__["Eraser"], {
                            className: "w-5 h-5 text-blue-400"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/ordem-form.tsx",
                            lineNumber: 711,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium",
                            children: "Após gerar seu documento, todos os campos foram limpos."
                        }, void 0, false, {
                            fileName: "[project]/components/forms/ordem-form.tsx",
                            lineNumber: 712,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/forms/ordem-form.tsx",
                    lineNumber: 710,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/forms/ordem-form.tsx",
                lineNumber: 702,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed bottom-6 right-6 z-50 transition-all duration-500 ${showCopyToast ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`,
                style: {
                    maxHeight: '120px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                            className: "w-5 h-5 text-white"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/ordem-form.tsx",
                            lineNumber: 725,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium",
                            children: "Valor copiado!"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/ordem-form.tsx",
                            lineNumber: 726,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/forms/ordem-form.tsx",
                    lineNumber: 724,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/forms/ordem-form.tsx",
                lineNumber: 716,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "bg-white border-2 border-neutral-300 shadow-sm rounded-xl p-6 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold",
                                children: "Cabeçalho"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/ordem-form.tsx",
                                lineNumber: 732,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-neutral-600",
                                children: "Informações básicas do cliente e da ordem de serviço"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/ordem-form.tsx",
                                lineNumber: 733,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                fileName: "[project]/components/forms/ordem-form.tsx",
                                lineNumber: 734,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "cliente",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: [
                                            "Cliente ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/ordem-form.tsx",
                                                lineNumber: 738,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 737,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "cliente",
                                        value: formData.cliente,
                                        onChange: (e)=>handleInputChange("cliente", e.target.value),
                                        className: `w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${errors.cliente ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`,
                                        placeholder: "Nome do cliente"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 740,
                                        columnNumber: 13
                                    }, this),
                                    errors.cliente && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-600",
                                        children: errors.cliente
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 749,
                                        columnNumber: 32
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/ordem-form.tsx",
                                lineNumber: 736,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "ordem_producao",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: "Ordem de Produção"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 753,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "ordem_producao",
                                        value: formData.ordem_producao,
                                        onChange: (e)=>handleInputChange("ordem_producao", e.target.value),
                                        className: "w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900",
                                        placeholder: "Número da ordem"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 756,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/ordem-form.tsx",
                                lineNumber: 752,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-sm font-medium text-neutral-800",
                                        children: [
                                            "Tipo de OS ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/ordem-form.tsx",
                                                lineNumber: 767,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 766,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            "visita",
                                            "molde",
                                            "instalacao"
                                        ].map((tipo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                        id: `tipo_${tipo}`,
                                                        checked: formData.tipo_os.includes(tipo),
                                                        onCheckedChange: (checked)=>handleTopLevelCheckbox("tipo_os", tipo, checked),
                                                        className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                                        lineNumber: 772,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                        htmlFor: `tipo_${tipo}`,
                                                        className: "cursor-pointer capitalize text-sm text-neutral-800",
                                                        children: tipo
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                                        lineNumber: 778,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, tipo, true, {
                                                fileName: "[project]/components/forms/ordem-form.tsx",
                                                lineNumber: 771,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 769,
                                        columnNumber: 13
                                    }, this),
                                    errors.tipo_os && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-600",
                                        children: errors.tipo_os
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 784,
                                        columnNumber: 32
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/ordem-form.tsx",
                                lineNumber: 765,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "endereco",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: "Endereço"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 788,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "endereco",
                                        value: formData.endereco,
                                        onChange: (e)=>handleInputChange("endereco", e.target.value),
                                        className: "w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900",
                                        placeholder: "Rua, número, complemento"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 791,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/ordem-form.tsx",
                                lineNumber: 787,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "cidade",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: "Cidade"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 801,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "cidade",
                                        value: formData.cidade,
                                        onChange: (e)=>handleInputChange("cidade", e.target.value),
                                        className: "w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900",
                                        placeholder: "Cidade/UF"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 804,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/ordem-form.tsx",
                                lineNumber: 800,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "celular",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: "Celular"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 814,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "celular",
                                        value: formData.celular,
                                        onChange: (e)=>handleInputChange("celular", e.target.value),
                                        className: "w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900",
                                        placeholder: "(00) 00000-0000"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 817,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/ordem-form.tsx",
                                lineNumber: 813,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "data_hora_visita",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: "Data e Hora da Visita"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 827,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 max-w-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                id: "data_hora_visita",
                                                type: "date",
                                                value: formData.data_hora_visita,
                                                onChange: (e)=>{
                                                    handleInputChange("data_hora_visita", e.target.value);
                                                    const today = new Date().toISOString().split('T')[0];
                                                    setIsDataHojeVisita(e.target.value === today);
                                                },
                                                className: "flex-1 bg-white text-neutral-900 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/ordem-form.tsx",
                                                lineNumber: 831,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                        id: "hoje_visita_checkbox",
                                                        checked: isDataHojeVisita,
                                                        onCheckedChange: (checked)=>{
                                                            setIsDataHojeVisita(checked);
                                                            if (checked) {
                                                                const today = new Date().toISOString().split('T')[0];
                                                                handleInputChange("data_hora_visita", today);
                                                            }
                                                        },
                                                        className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                                        lineNumber: 843,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                        htmlFor: "hoje_visita_checkbox",
                                                        className: "cursor-pointer text-sm text-neutral-800 whitespace-nowrap",
                                                        children: "Hoje"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                                        lineNumber: 855,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/forms/ordem-form.tsx",
                                                lineNumber: 842,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 830,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/ordem-form.tsx",
                                lineNumber: 826,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "vendedor",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: "Vendedor"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 866,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "vendedor",
                                        value: formData.vendedor,
                                        onChange: (e)=>handleInputChange("vendedor", e.target.value),
                                        className: "w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900",
                                        placeholder: "Nome do vendedor"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 869,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/ordem-form.tsx",
                                lineNumber: 865,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "informacoes_complementares",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: "Informações Complementares"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 879,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                        id: "informacoes_complementares",
                                        rows: 3,
                                        value: formData.informacoes_complementares,
                                        onChange: (e)=>handleInputChange("informacoes_complementares", e.target.value),
                                        className: "w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 resize-none",
                                        placeholder: "Observações adicionais..."
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 882,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/ordem-form.tsx",
                                lineNumber: 878,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/ordem-form.tsx",
                        lineNumber: 731,
                        columnNumber: 9
                    }, this),
                    formData.ambientes.map((ambiente, ambienteIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "bg-white border-2 border-neutral-300 shadow-sm rounded-xl p-6 space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-lg font-semibold",
                                                            children: [
                                                                "Ambiente ",
                                                                ambienteIndex + 1
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 898,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-neutral-600",
                                                            children: "Detalhes do ambiente onde será realizado o serviço"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 899,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 897,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    type: "button",
                                                    variant: "outline",
                                                    size: "sm",
                                                    onClick: ()=>handleRemoveAmbiente(ambienteIndex),
                                                    disabled: formData.ambientes.length === 1,
                                                    className: "border-2 border-red-500 text-red-600 hover:bg-red-50 disabled:opacity-30",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            className: "w-4 h-4 mr-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 909,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Remover ambiente"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 901,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 896,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 913,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: `ambiente_${ambienteIndex}`,
                                                    className: "text-sm font-medium text-neutral-800",
                                                    children: "Ambiente"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 916,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    id: `ambiente_${ambienteIndex}`,
                                                    value: ambiente.ambiente,
                                                    onChange: (e)=>handleAmbienteChange(ambienteIndex, "ambiente", e.target.value),
                                                    className: "w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900",
                                                    placeholder: "Ex: Sacada, Escada, Varanda"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 919,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 915,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: `tipo_piso_${ambienteIndex}`,
                                                    className: "text-sm font-medium text-neutral-800",
                                                    children: "Tipo de Piso"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 929,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    id: `tipo_piso_${ambienteIndex}`,
                                                    value: ambiente.tipo_piso,
                                                    onChange: (e)=>handleAmbienteChange(ambienteIndex, "tipo_piso", e.target.value),
                                                    className: "w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900",
                                                    placeholder: "Ex: Porcelanato, Madeira, Cerâmica"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 932,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 928,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: `medidas_${ambienteIndex}`,
                                                    className: "text-sm font-medium text-neutral-800",
                                                    children: "Medidas"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 942,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                                    id: `medidas_${ambienteIndex}`,
                                                    rows: 3,
                                                    value: ambiente.medidas,
                                                    onChange: (e)=>handleAmbienteChange(ambienteIndex, "medidas", e.target.value),
                                                    className: "w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 resize-none",
                                                    placeholder: "Descreva as medidas do ambiente..."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 945,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 941,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                    lineNumber: 895,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "bg-white border-2 border-neutral-300 shadow-sm rounded-xl p-6 space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold",
                                            children: "Inox"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 957,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-neutral-600",
                                            children: "Especificações de acabamento e tubulação em inox"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 958,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 959,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-medium text-neutral-800",
                                                    children: "Acabamento"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 962,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        "polido",
                                                        "escovado",
                                                        "pintado"
                                                    ].map((tipo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                    id: `inox_acabamento_${tipo}_${ambienteIndex}`,
                                                                    checked: ambiente.inox.acabamento.includes(tipo),
                                                                    onCheckedChange: (checked)=>handleCheckboxArray(ambienteIndex, "inox", "acabamento", tipo, checked),
                                                                    className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 966,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                    htmlFor: `inox_acabamento_${tipo}_${ambienteIndex}`,
                                                                    className: "cursor-pointer capitalize text-sm text-neutral-800",
                                                                    children: tipo
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 974,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, tipo, true, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 965,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 963,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 961,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-medium text-neutral-800",
                                                    children: "Passamão"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 986,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        "simples",
                                                        "duplo"
                                                    ].map((tipo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                    id: `inox_passamao_${tipo}_${ambienteIndex}`,
                                                                    checked: ambiente.inox.passamao.includes(tipo),
                                                                    onCheckedChange: (checked)=>handleCheckboxArray(ambienteIndex, "inox", "passamao", tipo, checked),
                                                                    className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 990,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                    htmlFor: `inox_passamao_${tipo}_${ambienteIndex}`,
                                                                    className: "cursor-pointer capitalize text-sm text-neutral-800",
                                                                    children: tipo
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 998,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, tipo, true, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 989,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 987,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 985,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-medium text-neutral-800",
                                                    children: "Tubos"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1010,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        {
                                                            value: "1_1_2",
                                                            label: '1 1/2"'
                                                        },
                                                        {
                                                            value: "1",
                                                            label: '1"'
                                                        },
                                                        {
                                                            value: "30x30",
                                                            label: "30x30"
                                                        },
                                                        {
                                                            value: "40x10",
                                                            label: "40x10"
                                                        }
                                                    ].map((tubo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                    id: `inox_tubos_${tubo.value}_${ambienteIndex}`,
                                                                    checked: ambiente.inox.tubos.includes(tubo.value),
                                                                    onCheckedChange: (checked)=>handleCheckboxArray(ambienteIndex, "inox", "tubos", tubo.value, checked),
                                                                    className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1019,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                    htmlFor: `inox_tubos_${tubo.value}_${ambienteIndex}`,
                                                                    className: "cursor-pointer text-sm text-neutral-800",
                                                                    children: tubo.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1027,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, tubo.value, true, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 1018,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1011,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1009,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-medium text-neutral-800",
                                                    children: "Opções"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1039,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        {
                                                            value: "com_uniao",
                                                            label: "Com União"
                                                        },
                                                        {
                                                            value: "uniao_com_curva",
                                                            label: "União com Curva"
                                                        },
                                                        {
                                                            value: "inicio_com_curva",
                                                            label: "Início com Curva"
                                                        },
                                                        {
                                                            value: "final_com_curva",
                                                            label: "Final com Curva"
                                                        },
                                                        {
                                                            value: "pinado",
                                                            label: "Pinado"
                                                        }
                                                    ].map((flag)=>{
                                                        const simKey = `${flag.value}_sim`;
                                                        const naoKey = `${flag.value}_nao`;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid items-center gap-4",
                                                            style: {
                                                                gridTemplateColumns: "1fr auto auto"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm text-neutral-800",
                                                                    children: flag.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1056,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 justify-self-start",
                                                                    style: {
                                                                        width: "64px"
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                            id: `inox_flag_${flag.value}_sim_${ambienteIndex}`,
                                                                            checked: ambiente.inox.flags[simKey] || false,
                                                                            onCheckedChange: (checked)=>handleBooleanFlag(ambienteIndex, "inox", simKey, checked),
                                                                            className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                                            lineNumber: 1058,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                            htmlFor: `inox_flag_${flag.value}_sim_${ambienteIndex}`,
                                                                            className: "cursor-pointer text-sm text-neutral-800",
                                                                            children: "Sim"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                                            lineNumber: 1066,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1057,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 justify-self-start",
                                                                    style: {
                                                                        width: "64px"
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                            id: `inox_flag_${flag.value}_nao_${ambienteIndex}`,
                                                                            checked: ambiente.inox.flags[naoKey] || false,
                                                                            onCheckedChange: (checked)=>handleBooleanFlag(ambienteIndex, "inox", naoKey, checked),
                                                                            className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                                            lineNumber: 1074,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                            htmlFor: `inox_flag_${flag.value}_nao_${ambienteIndex}`,
                                                                            className: "cursor-pointer text-sm text-neutral-800",
                                                                            children: "Não"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                                            lineNumber: 1082,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1073,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, flag.value, true, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 1051,
                                                            columnNumber: 23
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1040,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1038,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                    lineNumber: 956,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "bg-white border-2 border-neutral-300 shadow-sm rounded-xl p-6 space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold",
                                            children: "Hastes"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1097,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-neutral-600",
                                            children: "Configuração das hastes de fixação"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1098,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1099,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-medium text-neutral-800",
                                                    children: "Tipo"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1102,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        {
                                                            value: "1_1_2",
                                                            label: '1 1/2"'
                                                        },
                                                        {
                                                            value: "1",
                                                            label: '1"'
                                                        },
                                                        {
                                                            value: "30x30",
                                                            label: "30x30"
                                                        },
                                                        {
                                                            value: "40x10",
                                                            label: "40x10"
                                                        }
                                                    ].map((tipo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                    id: `hastes_tipo_${tipo.value}_${ambienteIndex}`,
                                                                    checked: ambiente.hastes.tipo.includes(tipo.value),
                                                                    onCheckedChange: (checked)=>handleCheckboxArray(ambienteIndex, "hastes", "tipo", tipo.value, checked),
                                                                    className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1111,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                    htmlFor: `hastes_tipo_${tipo.value}_${ambienteIndex}`,
                                                                    className: "cursor-pointer text-sm text-neutral-800",
                                                                    children: tipo.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1119,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, tipo.value, true, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 1110,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1103,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1101,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-medium text-neutral-800",
                                                    children: "Fixação"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1131,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        {
                                                            value: "lateral",
                                                            label: "Lateral"
                                                        },
                                                        {
                                                            value: "superior",
                                                            label: "Superior"
                                                        },
                                                        {
                                                            value: "flange",
                                                            label: "Flange"
                                                        },
                                                        {
                                                            value: "tarugo_padrao",
                                                            label: "Tarugo Padrão"
                                                        }
                                                    ].map((fixacao)=>{
                                                        const fixacaoKey = fixacao.value;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                    id: `hastes_fixacao_${fixacao.value}_${ambienteIndex}`,
                                                                    checked: ambiente.hastes.fixacao[fixacaoKey] || false,
                                                                    onCheckedChange: (checked)=>handleHasteFixacaoChange(ambienteIndex, fixacao.value, checked),
                                                                    className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1142,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                    htmlFor: `hastes_fixacao_${fixacao.value}_${ambienteIndex}`,
                                                                    className: "cursor-pointer text-sm text-neutral-800",
                                                                    children: fixacao.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1150,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, fixacao.value, true, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 1141,
                                                            columnNumber: 23
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1132,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1130,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                    lineNumber: 1096,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "bg-white border-2 border-neutral-300 shadow-sm rounded-xl p-6 space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold",
                                            children: "Intermediários"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1164,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-neutral-600",
                                            children: "Especificações dos elementos intermediários"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1165,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1166,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-medium text-neutral-800",
                                                    children: "Tipo"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1169,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        {
                                                            value: "1_2",
                                                            label: '1/2"'
                                                        },
                                                        {
                                                            value: "5_8",
                                                            label: '5/8"'
                                                        },
                                                        {
                                                            value: "cabo_de_aco",
                                                            label: "Cabo de Aço"
                                                        }
                                                    ].map((tipo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                    id: `intermediarios_tipo_${tipo.value}_${ambienteIndex}`,
                                                                    checked: ambiente.intermediarios.tipo.includes(tipo.value),
                                                                    onCheckedChange: (checked)=>handleCheckboxArray(ambienteIndex, "intermediarios", "tipo", tipo.value, checked),
                                                                    className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1177,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                    htmlFor: `intermediarios_tipo_${tipo.value}_${ambienteIndex}`,
                                                                    className: "cursor-pointer text-sm text-neutral-800",
                                                                    children: tipo.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1185,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, tipo.value, true, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 1176,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1170,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1168,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-medium text-neutral-800",
                                                    children: "Opções"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1197,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                    id: `intermediarios_com_uniao_${ambienteIndex}`,
                                                                    checked: ambiente.intermediarios.com_uniao,
                                                                    onCheckedChange: (checked)=>handleBooleanFlag(ambienteIndex, "intermediarios", "com_uniao", checked),
                                                                    className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1200,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                    htmlFor: `intermediarios_com_uniao_${ambienteIndex}`,
                                                                    className: "cursor-pointer text-sm text-neutral-800",
                                                                    children: "Com União"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1208,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 1199,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                    id: `intermediarios_transpassado_${ambienteIndex}`,
                                                                    checked: ambiente.intermediarios.transpassado,
                                                                    onCheckedChange: (checked)=>handleBooleanFlag(ambienteIndex, "intermediarios", "transpassado", checked),
                                                                    className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1217,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                    htmlFor: `intermediarios_transpassado_${ambienteIndex}`,
                                                                    className: "cursor-pointer text-sm text-neutral-800",
                                                                    children: "Transpassado"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1225,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 1216,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1198,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1196,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                    lineNumber: 1163,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "bg-white border-2 border-neutral-300 shadow-sm rounded-xl p-6 space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold",
                                            children: "Vidro"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1237,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-neutral-600",
                                            children: "Especificações dos elementos de vidro"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1238,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1239,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-medium text-neutral-800",
                                                    children: "Acabamento Superior"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1242,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        "passamao",
                                                        "perfil"
                                                    ].map((tipo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                    id: `vidro_acabamento_superior_${tipo}_${ambienteIndex}`,
                                                                    checked: ambiente.vidro.acabamento_superior.includes(tipo),
                                                                    onCheckedChange: (checked)=>handleCheckboxArray(ambienteIndex, "vidro", "acabamento_superior", tipo, checked),
                                                                    className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1246,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                    htmlFor: `vidro_acabamento_superior_${tipo}_${ambienteIndex}`,
                                                                    className: "cursor-pointer capitalize text-sm text-neutral-800",
                                                                    children: tipo
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1254,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, tipo, true, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 1245,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1243,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1241,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-medium text-neutral-800",
                                                    children: "Tubos"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1266,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        {
                                                            value: "1_1_2",
                                                            label: '1 1/2"'
                                                        },
                                                        {
                                                            value: "1",
                                                            label: '1"'
                                                        },
                                                        {
                                                            value: "30x30",
                                                            label: "30x30"
                                                        },
                                                        {
                                                            value: "40x10",
                                                            label: "40x10"
                                                        }
                                                    ].map((tubo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                    id: `vidro_tubos_${tubo.value}_${ambienteIndex}`,
                                                                    checked: ambiente.vidro.tubos.includes(tubo.value),
                                                                    onCheckedChange: (checked)=>handleCheckboxArray(ambienteIndex, "vidro", "tubos", tubo.value, checked),
                                                                    className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1275,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                    htmlFor: `vidro_tubos_${tubo.value}_${ambienteIndex}`,
                                                                    className: "cursor-pointer text-sm text-neutral-800",
                                                                    children: tubo.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1283,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, tubo.value, true, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 1274,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1267,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1265,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-medium text-neutral-800",
                                                    children: "Fixação"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1295,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        "pinca",
                                                        "orelha",
                                                        "baguete",
                                                        "botons"
                                                    ].map((fixacao)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                    id: `vidro_fixacao_${fixacao}_${ambienteIndex}`,
                                                                    checked: ambiente.vidro.fixacao.includes(fixacao),
                                                                    onCheckedChange: (checked)=>handleCheckboxArray(ambienteIndex, "vidro", "fixacao", fixacao, checked),
                                                                    className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1299,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                    htmlFor: `vidro_fixacao_${fixacao}_${ambienteIndex}`,
                                                                    className: "cursor-pointer capitalize text-sm text-neutral-800",
                                                                    children: fixacao
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1307,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, fixacao, true, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 1298,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1296,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1294,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-medium text-neutral-800",
                                                    children: "Acabamento"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1319,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        "polido",
                                                        "escovado",
                                                        "pintado"
                                                    ].map((acabamento)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                    id: `vidro_acabamento_${acabamento}_${ambienteIndex}`,
                                                                    checked: ambiente.vidro.acabamento.includes(acabamento),
                                                                    onCheckedChange: (checked)=>handleCheckboxArray(ambienteIndex, "vidro", "acabamento", acabamento, checked),
                                                                    className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1323,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                    htmlFor: `vidro_acabamento_${acabamento}_${ambienteIndex}`,
                                                                    className: "cursor-pointer text-sm text-neutral-800",
                                                                    children: acabamento
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1331,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, acabamento, true, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 1322,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1320,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1318,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-medium text-neutral-800",
                                                    children: "Tipo"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1343,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        "temperado",
                                                        "laminado"
                                                    ].map((tipo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                    id: `vidro_tipo_${tipo}_${ambienteIndex}`,
                                                                    checked: ambiente.vidro.tipo.includes(tipo),
                                                                    onCheckedChange: (checked)=>handleCheckboxArray(ambienteIndex, "vidro", "tipo", tipo, checked),
                                                                    className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1347,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                    htmlFor: `vidro_tipo_${tipo}_${ambienteIndex}`,
                                                                    className: "cursor-pointer capitalize text-sm text-neutral-800",
                                                                    children: tipo
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1355,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, tipo, true, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 1346,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1344,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1342,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-medium text-neutral-800",
                                                    children: "Espessura"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1367,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        "8mm",
                                                        "10mm",
                                                        "5+5mm"
                                                    ].map((espessura)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                    id: `vidro_espessura_${espessura}_${ambienteIndex}`,
                                                                    checked: ambiente.vidro.espessura.includes(espessura),
                                                                    onCheckedChange: (checked)=>handleCheckboxArray(ambienteIndex, "vidro", "espessura", espessura, checked),
                                                                    className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1371,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                    htmlFor: `vidro_espessura_${espessura}_${ambienteIndex}`,
                                                                    className: "cursor-pointer text-sm text-neutral-800",
                                                                    children: espessura
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                                    lineNumber: 1379,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, espessura, true, {
                                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                                            lineNumber: 1370,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1368,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1366,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                    lineNumber: 1236,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, ambienteIndex, true, {
                            fileName: "[project]/components/forms/ordem-form.tsx",
                            lineNumber: 894,
                            columnNumber: 11
                        }, this)),
                    formData.ambientes.length < 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "bg-neutral-50 border-2 border-dashed border-neutral-300 shadow-sm rounded-xl p-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "button",
                            variant: "outline",
                            onClick: handleAddAmbiente,
                            className: "w-full border-2 border-neutral-400 hover:bg-neutral-100 bg-transparent",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-5 h-5 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                    lineNumber: 1401,
                                    columnNumber: 15
                                }, this),
                                "Adicionar Ambiente"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/forms/ordem-form.tsx",
                            lineNumber: 1395,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/forms/ordem-form.tsx",
                        lineNumber: 1394,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end pt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "submit",
                            size: "lg",
                            className: "bg-neutral-900 hover:bg-neutral-800",
                            children: "Salvar Ordem de Serviço"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/ordem-form.tsx",
                            lineNumber: 1408,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/forms/ordem-form.tsx",
                        lineNumber: 1407,
                        columnNumber: 9
                    }, this),
                    isOrdemSalva && buildCompletePayload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "bg-neutral-50 border-2 border-neutral-300 p-4 mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"], {
                                                className: "w-5 h-5 text-neutral-700"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/ordem-form.tsx",
                                                lineNumber: 1417,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-sm font-semibold text-neutral-900",
                                                children: "Informações técnicas"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/ordem-form.tsx",
                                                lineNumber: 1418,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 1416,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "w-5 h-5 text-green-600"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/ordem-form.tsx",
                                        lineNumber: 1420,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/ordem-form.tsx",
                                lineNumber: 1415,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-h-96 overflow-y-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs bg-white p-3 rounded border border-neutral-200 space-y-1",
                                    children: Object.entries(buildCompletePayload()).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-neutral-600 font-medium whitespace-nowrap",
                                                    children: [
                                                        key,
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1426,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-neutral-900 flex-1 cursor-pointer hover:bg-neutral-100 px-1 rounded transition-colors",
                                                    title: String(value),
                                                    onClick: ()=>handleCopyValue(value),
                                                    children: truncateValue(value)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                                    lineNumber: 1427,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/components/forms/ordem-form.tsx",
                                            lineNumber: 1425,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/forms/ordem-form.tsx",
                                    lineNumber: 1423,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/forms/ordem-form.tsx",
                                lineNumber: 1422,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/ordem-form.tsx",
                        lineNumber: 1414,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/forms/ordem-form.tsx",
                lineNumber: 730,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(OrdemForm, "fVYbgbDh3GN/gLwFB35M4KHKlw8=");
_c = OrdemForm;
var _c;
__turbopack_context__.k.register(_c, "OrdemForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/radio-group.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RadioGroup",
    ()=>RadioGroup,
    "RadioGroupItem",
    ()=>RadioGroupItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-radio-group/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as CircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function RadioGroup({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "radio-group",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('grid gap-3', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/radio-group.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = RadioGroup;
function RadioGroupItem({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "radio-group-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "radio-group-indicator",
            className: "relative flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__["CircleIcon"], {
                className: "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2"
            }, void 0, false, {
                fileName: "[project]/components/ui/radio-group.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ui/radio-group.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/radio-group.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c1 = RadioGroupItem;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "RadioGroup");
__turbopack_context__.k.register(_c1, "RadioGroupItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/forms/contrato-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContratoForm",
    ()=>ContratoForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/radio-group.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/checkbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as ImageIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eraser.js [app-client] (ecmascript) <export default as Eraser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code.js [app-client] (ecmascript) <export default as Code>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const numberToWordsFull = (num)=>{
    if (num === 0) return "zero reais";
    const unidades = [
        "",
        "um",
        "dois",
        "três",
        "quatro",
        "cinco",
        "seis",
        "sete",
        "oito",
        "nove"
    ];
    const especiais = [
        "dez",
        "onze",
        "doze",
        "treze",
        "quatorze",
        "quinze",
        "dezesseis",
        "dezessete",
        "dezoito",
        "dezenove"
    ];
    const dezenas = [
        "",
        "",
        "vinte",
        "trinta",
        "quarenta",
        "cinquenta",
        "sessenta",
        "setenta",
        "oitenta",
        "noventa"
    ];
    const centenas = [
        "",
        "cem",
        "duzentos",
        "trezentos",
        "quatrocentos",
        "quinhentos",
        "seiscentos",
        "setecentos",
        "oitocentos",
        "novecentos"
    ];
    const convertirGrupo = (n)=>{
        if (n === 0) return "";
        if (n === 100) return "cem";
        let resultado = "";
        const c = Math.floor(n / 100);
        const d = Math.floor(n % 100 / 10);
        const u = n % 10;
        if (c > 0) resultado += centenas[c];
        if (d === 1) {
            if (resultado) resultado += " e ";
            resultado += especiais[u];
            return resultado;
        }
        if (d > 1) {
            if (resultado) resultado += " e ";
            resultado += dezenas[d];
        }
        if (u > 0) {
            if (resultado && d !== 1) resultado += " e ";
            else if (resultado) resultado += " ";
            resultado += unidades[u];
        }
        return resultado;
    };
    const inteiro = Math.floor(num);
    const centavos = Math.round((num - inteiro) * 100);
    let texto = "";
    // Milhões
    const milhoes = Math.floor(inteiro / 1000000);
    if (milhoes > 0) {
        if (milhoes === 1) {
            texto = "um milhão";
        } else {
            texto = convertirGrupo(milhoes) + " milhões";
        }
    }
    // Milhares
    const milhares = Math.floor(inteiro % 1000000 / 1000);
    if (milhares > 0) {
        if (texto) texto += " e ";
        if (milhares === 1) {
            texto += "mil";
        } else {
            texto += convertirGrupo(milhares) + " mil";
        }
    }
    // Centenas
    const resto = inteiro % 1000;
    if (resto > 0) {
        if (texto && resto < 100) texto += " e ";
        else if (texto) texto += " ";
        texto += convertirGrupo(resto);
    }
    // Adiciona "reais"
    if (inteiro === 1) {
        texto += " real";
    } else {
        texto += " reais";
    }
    // Centavos
    if (centavos > 0) {
        texto += " e " + convertirGrupo(centavos);
        texto += centavos === 1 ? " centavo" : " centavos";
    }
    return texto;
};
const formatCurrency = (value)=>{
    const numbers = value.replace(/\D/g, "");
    if (!numbers) return "";
    const amount = Number.parseFloat(numbers) / 100;
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(amount);
};
const parseCurrency = (value)=>{
    if (!value) return 0;
    const numbers = value.replace(/\D/g, "");
    return Number.parseFloat(numbers) / 100;
};
const formatPhone = (value)=>{
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
        return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
};
const formatCPF = (value)=>{
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4").replace(/-$/, "");
};
function ContratoForm({ gerarContrato, setGerarContrato, tipoContrato, setTipoContrato, contratoData, setContratoData, errors, setErrors }) {
    _s();
    const [fotoOrcamentoBase64, setFotoOrcamentoBase64] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDragOver, setIsDragOver] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSuccessToast, setShowSuccessToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showWarningToast, setShowWarningToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showMissingFieldsToast, setShowMissingFieldsToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showClearFieldsToast, setShowClearFieldsToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasImage, setHasImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showThumbnailHover, setShowThumbnailHover] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isToday, setIsToday] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [quickFillOptions, setQuickFillOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        guardaCorpo: false,
        corrimao: false,
        box: false
    });
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [showLoadingModal, setShowLoadingModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoadingComplete, setIsLoadingComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submittedPayload, setSubmittedPayload] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showCopyToast, setShowCopyToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContratoForm.useEffect": ()=>{
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            setContratoData({
                "ContratoForm.useEffect": (prev)=>({
                        ...prev,
                        data_emissao_contrato: formattedDate
                    })
            }["ContratoForm.useEffect"]);
        }
    }["ContratoForm.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContratoForm.useEffect": ()=>{
            const handlePaste = {
                "ContratoForm.useEffect.handlePaste": async (e)=>{
                    if (hasImage) {
                        setShowWarningToast(true);
                        return;
                    }
                    const items = e.clipboardData?.items;
                    if (!items) return;
                    for (const item of items){
                        if (item.type.startsWith('image/')) {
                            const file = item.getAsFile();
                            if (file) {
                                await processImageFile(file);
                            }
                        }
                    }
                }
            }["ContratoForm.useEffect.handlePaste"];
            document.addEventListener('paste', handlePaste);
            return ({
                "ContratoForm.useEffect": ()=>document.removeEventListener('paste', handlePaste)
            })["ContratoForm.useEffect"];
        }
    }["ContratoForm.useEffect"], [
        hasImage
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContratoForm.useEffect": ()=>{
            if (showSuccessToast) {
                const timer = setTimeout({
                    "ContratoForm.useEffect.timer": ()=>{
                        setShowSuccessToast(false);
                    }
                }["ContratoForm.useEffect.timer"], 5000);
                return ({
                    "ContratoForm.useEffect": ()=>clearTimeout(timer)
                })["ContratoForm.useEffect"];
            }
        }
    }["ContratoForm.useEffect"], [
        showSuccessToast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContratoForm.useEffect": ()=>{
            if (showWarningToast) {
                const timer = setTimeout({
                    "ContratoForm.useEffect.timer": ()=>{
                        setShowWarningToast(false);
                    }
                }["ContratoForm.useEffect.timer"], 5000);
                return ({
                    "ContratoForm.useEffect": ()=>clearTimeout(timer)
                })["ContratoForm.useEffect"];
            }
        }
    }["ContratoForm.useEffect"], [
        showWarningToast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContratoForm.useEffect": ()=>{
            if (showMissingFieldsToast) {
                const timer = setTimeout({
                    "ContratoForm.useEffect.timer": ()=>{
                        setShowMissingFieldsToast(false);
                    }
                }["ContratoForm.useEffect.timer"], 5000);
                return ({
                    "ContratoForm.useEffect": ()=>clearTimeout(timer)
                })["ContratoForm.useEffect"];
            }
        }
    }["ContratoForm.useEffect"], [
        showMissingFieldsToast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContratoForm.useEffect": ()=>{
            if (showClearFieldsToast) {
                const timer = setTimeout({
                    "ContratoForm.useEffect.timer": ()=>{
                        setShowClearFieldsToast(false);
                    }
                }["ContratoForm.useEffect.timer"], 5000);
                return ({
                    "ContratoForm.useEffect": ()=>clearTimeout(timer)
                })["ContratoForm.useEffect"];
            }
        }
    }["ContratoForm.useEffect"], [
        showClearFieldsToast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContratoForm.useEffect": ()=>{
            if (showCopyToast) {
                const timer = setTimeout({
                    "ContratoForm.useEffect.timer": ()=>{
                        setShowCopyToast(false);
                    }
                }["ContratoForm.useEffect.timer"], 3000);
                return ({
                    "ContratoForm.useEffect": ()=>clearTimeout(timer)
                })["ContratoForm.useEffect"];
            }
        }
    }["ContratoForm.useEffect"], [
        showCopyToast
    ]);
    const handleContratoInputChange = (field, value)=>{
        let formattedValue = value;
        // Apply formatting based on field type
        if (field === "telefone") {
            formattedValue = formatPhone(value);
        } else if (field === "cpf") {
            formattedValue = formatCPF(value);
        } else if (field === "valor_produtos_instalacao" || field === "valor_entrada" || field === "valor_desconto") {
            formattedValue = formatCurrency(value);
        }
        setContratoData((prev)=>({
                ...prev,
                [field]: formattedValue
            }));
        if (errors[field]) {
            setErrors((prev)=>({
                    ...prev,
                    [field]: ""
                }));
        }
    };
    const handleDateChange = (value)=>{
        setContratoData((prev)=>({
                ...prev,
                data_emissao_contrato: value
            }));
        // Check if the new date is today
        const today = new Date().toISOString().split('T')[0];
        setIsToday(value === today);
        if (errors.data_emissao_contrato) {
            setErrors((prev)=>({
                    ...prev,
                    data_emissao_contrato: ""
                }));
        }
    };
    const handleTodayCheckbox = (checked)=>{
        setIsToday(checked);
        if (checked) {
            const today = new Date().toISOString().split('T')[0];
            setContratoData((prev)=>({
                    ...prev,
                    data_emissao_contrato: today
                }));
        }
    };
    const convertToBase64 = (file)=>{
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.onload = ()=>{
                if (typeof reader.result === "string") {
                    resolve(reader.result);
                } else {
                    reject(new Error("Failed to convert file to base64"));
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };
    const isImageFile = (file)=>{
        return file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg";
    };
    const processImageFile = async (file)=>{
        if (hasImage) {
            setShowWarningToast(true);
            return;
        }
        if (isImageFile(file)) {
            try {
                const base64 = await convertToBase64(file);
                setFotoOrcamentoBase64(base64);
                setHasImage(true);
                setShowSuccessToast(true);
            } catch (error) {
                console.error("Error converting file to base64:", error);
            }
        } else {
            alert("Por favor, selecione apenas arquivos de imagem (PNG, JPG ou JPEG)");
        }
    };
    const handleFileUpload = async (event)=>{
        const file = event.target.files?.[0];
        if (file) {
            await processImageFile(file);
        }
    };
    const handleDragOver = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };
    const handleDragLeave = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };
    const handleDrop = async (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            await processImageFile(file);
        }
    };
    const handleRemoveImage = ()=>{
        setFotoOrcamentoBase64(null);
        setHasImage(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    const handleSubmit = async ()=>{
        // Validate required fields
        const newErrors = {};
        if (!contratoData.tipo_projeto) newErrors.tipo_projeto = "Campo obrigatório";
        if (!contratoData.nome) newErrors.nome = "Campo obrigatório";
        if (!contratoData.telefone) newErrors.telefone = "Campo obrigatório";
        if (!contratoData.endereco_contrato) newErrors.endereco_contrato = "Campo obrigatório";
        if (!contratoData.cpf) newErrors.cpf = "Campo obrigatório";
        if (!contratoData.forma_pagamento) newErrors.forma_pagamento = "Campo obrigatório";
        if (!contratoData.valor_produtos_instalacao) newErrors.valor_produtos_instalacao = "Campo obrigatório";
        if (!contratoData.data_emissao_contrato) newErrors.data_emissao_contrato = "Campo obrigatório";
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // Show toast
            setShowMissingFieldsToast(true);
            // Find first error field and scroll to it
            const firstErrorField = Object.keys(newErrors)[0];
            const fieldElement = document.getElementById(firstErrorField === 'tipo_projeto' ? 'tipo_projeto' : firstErrorField === 'nome' ? 'nome_contrato' : firstErrorField === 'telefone' ? 'telefone_contrato' : firstErrorField === 'endereco_contrato' ? 'endereco_contrato' : firstErrorField === 'cpf' ? 'cpf_contrato' : firstErrorField === 'forma_pagamento' ? 'forma_pagamento_Transferência bancária (TED/PIX)' : firstErrorField === 'valor_produtos_instalacao' ? 'valor_produtos' : 'data_emissao_contrato');
            if (fieldElement) {
                const elementPosition = fieldElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - window.innerHeight / 2 + fieldElement.offsetHeight / 2;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            return;
        }
        const valorProdutosNum = parseCurrency(contratoData.valor_produtos_instalacao);
        const valorDescontoNum = parseCurrency(contratoData.valor_desconto);
        const valorFinalNumero = valorProdutosNum - valorDescontoNum;
        const quantidadeParcelas = Number.parseInt(contratoData.quantidade_parcelas) || 1;
        const valorParcelasNumero = valorFinalNumero / quantidadeParcelas;
        const valorFinalFormatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(valorFinalNumero);
        const valorParcelasFormatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(valorParcelasNumero);
        const valorTotalExtenso = numberToWordsFull(valorFinalNumero);
        const valorParcelaExtenso = numberToWordsFull(valorParcelasNumero);
        const payload = {
            tipo_projeto: contratoData.tipo_projeto,
            nome_contratante: contratoData.nome,
            telefone_contratante: contratoData.telefone,
            endereco_contratante: contratoData.endereco_contrato,
            cpf_contratante: contratoData.cpf,
            forma_pagamento_nao_parcelado: contratoData.forma_pagamento,
            valor_produtos_instalacao: contratoData.valor_produtos_instalacao,
            valor_entrada: contratoData.valor_entrada || "",
            valor_desconto: contratoData.valor_desconto || "",
            quantidade_parcelas: contratoData.quantidade_parcelas || "1",
            forma_pagamento_parcelas: contratoData.forma_pagamento_parcelas || "",
            observacao_pagamento: contratoData.observacao_pagamento || "",
            data_emissao_contrato: contratoData.data_emissao_contrato,
            valor_final: valorFinalFormatted,
            valor_total_extenso: valorTotalExtenso,
            valor_parcelas: valorParcelasFormatted,
            valor_parcela_extenso: valorParcelaExtenso,
            foto_orcamento_base64: fotoOrcamentoBase64 || null
        };
        setIsSubmitting(true);
        setShowLoadingModal(true);
        setIsLoadingComplete(false);
        setSubmittedPayload(payload);
        setCountdown(10);
        try {
            console.log("[v0] Enviando contrato pessoa física para n8n...");
            console.log("[v0] Payload:", JSON.stringify(payload, null, 2));
            const response = await fetch("/api/contrato-fisica", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            console.log("[v0] Resposta da API:", result);
            if (!response.ok || !result.success) {
                throw new Error(result.error || "Erro ao enviar contrato");
            }
            console.log("[v0] Contrato enviado com sucesso!");
        } catch (error) {
            console.error("[v0] Erro ao enviar contrato:", error);
        } finally{
            const countdownInterval = setInterval(()=>{
                setCountdown((prev)=>{
                    if (prev <= 1) {
                        clearInterval(countdownInterval);
                        setIsLoadingComplete(true);
                        setIsSubmitting(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    };
    const handleCloseModal = ()=>{
        setShowLoadingModal(false);
    };
    const handleQuickFillChange = (option, checked)=>{
        const newOptions = {
            ...quickFillOptions,
            [option]: checked
        };
        setQuickFillOptions(newOptions);
        // Build the text based on selected options
        const selectedOptions = [];
        if (newOptions.guardaCorpo) selectedOptions.push('Guarda-corpo');
        if (newOptions.corrimao) selectedOptions.push('corrimão');
        if (newOptions.box) selectedOptions.push('box');
        let tipoProjeto = '';
        if (selectedOptions.length === 1) {
            tipoProjeto = selectedOptions[0];
        } else if (selectedOptions.length === 2) {
            tipoProjeto = `${selectedOptions[0]} e ${selectedOptions[1]}`;
        } else if (selectedOptions.length === 3) {
            tipoProjeto = `${selectedOptions[0]}, ${selectedOptions[1]} e ${selectedOptions[2]}`;
        }
        handleContratoInputChange('tipo_projeto', tipoProjeto);
    };
    const hasAnyFieldContent = ()=>{
        return contratoData.tipo_projeto || contratoData.nome || contratoData.telefone || contratoData.endereco_contrato || contratoData.cpf || contratoData.forma_pagamento || contratoData.valor_produtos_instalacao || contratoData.valor_entrada || contratoData.valor_desconto || contratoData.quantidade_parcelas || contratoData.forma_pagamento_parcelas || contratoData.observacao_pagamento || hasImage;
    };
    const handleClearAllFields = ()=>{
        setContratoData({
            tipo_projeto: "",
            nome: "",
            telefone: "",
            endereco_contrato: "",
            cpf: "",
            forma_pagamento: "",
            valor_produtos_instalacao: "",
            valor_entrada: "",
            valor_desconto: "",
            quantidade_parcelas: "",
            forma_pagamento_parcelas: "",
            observacao_pagamento: "",
            data_emissao_contrato: new Date().toISOString().split('T')[0]
        });
        setFotoOrcamentoBase64(null);
        setHasImage(false);
        setQuickFillOptions({
            guardaCorpo: false,
            corrimao: false,
            box: false
        });
        setErrors({});
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setShowClearFieldsToast(true);
    };
    const handleCopyValue = async (value)=>{
        const textToCopy = typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value);
        try {
            await navigator.clipboard.writeText(textToCopy);
            setShowCopyToast(true);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };
    const truncateValue = (value)=>{
        const str = typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value);
        return str.length > 30 ? `${str.substring(0, 30)}...` : str;
    };
    if (!gerarContrato || tipoContrato !== "fisica") {
        return null;
    }
    const DRIVE_LINK = 'https://drive.google.com/drive/u/0/folders/1TyCZ0ZgO3tM4i-jzEKo5bX112KdVAQ7b';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            showLoadingModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-6 w-[400px] min-h-[340px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleCloseModal,
                            className: "absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors",
                            "aria-label": "Fechar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 633,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-form.tsx",
                            lineNumber: 628,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-20 relative flex-shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/google_drive.svg",
                                alt: "Google Drive",
                                className: `w-full h-full object-contain drop-shadow-lg transition-all duration-500`,
                                style: {
                                    filter: !isLoadingComplete ? 'grayscale(100%)' : 'none'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 637,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-form.tsx",
                            lineNumber: 636,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-4 flex-1 justify-center",
                            style: {
                                minHeight: '140px'
                            },
                            children: !isLoadingComplete ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "w-8 h-8 animate-spin text-blue-600"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 648,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-semibold text-neutral-900",
                                        children: "Gerando contrato..."
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 649,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-neutral-600 text-center",
                                        children: [
                                            "Gerando seu documento em ",
                                            countdown,
                                            " segundos"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 650,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-semibold text-green-600",
                                        children: "Seu arquivo está pronto"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 654,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: DRIVE_LINK,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-5 h-5",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/contrato-form.tsx",
                                                    lineNumber: 662,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-form.tsx",
                                                lineNumber: 661,
                                                columnNumber: 21
                                            }, this),
                                            "Acessar pasta do arquivo"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 655,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-form.tsx",
                            lineNumber: 645,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/forms/contrato-form.tsx",
                    lineNumber: 627,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/forms/contrato-form.tsx",
                lineNumber: 626,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed bottom-6 right-6 z-50 transition-all duration-500 ${showCopyToast ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`,
                style: {
                    maxHeight: '120px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                            className: "w-5 h-5 text-white"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-form.tsx",
                            lineNumber: 682,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium",
                            children: "Valor copiado!"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-form.tsx",
                            lineNumber: 683,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/forms/contrato-form.tsx",
                    lineNumber: 681,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/forms/contrato-form.tsx",
                lineNumber: 673,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed bottom-6 right-6 z-50 transition-all duration-500 ${showClearFieldsToast ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`,
                style: {
                    maxHeight: '120px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__["Eraser"], {
                            className: "w-5 h-5 text-white"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-form.tsx",
                            lineNumber: 696,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium",
                            children: "Todos os campos foram limpos"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-form.tsx",
                            lineNumber: 697,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/forms/contrato-form.tsx",
                    lineNumber: 695,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/forms/contrato-form.tsx",
                lineNumber: 687,
                columnNumber: 7
            }, this),
            hasAnyFieldContent() && !showLoadingModal && isLoadingComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed right-6 z-40 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg shadow-lg transition-all duration-200 hover:scale-105",
                style: {
                    bottom: '24px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleClearAllFields,
                        className: "absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-md transition-colors",
                        "aria-label": "Fechar e limpar",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-form.tsx",
                            lineNumber: 708,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 703,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleClearAllFields,
                        className: "px-4 py-3 flex items-center gap-2",
                        "aria-label": "Limpar todos os campos",
                        title: "Limpar todos os campos",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__["Eraser"], {
                                className: "w-5 h-5 text-white"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 716,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium",
                                children: "Limpar campos"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 717,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 710,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/forms/contrato-form.tsx",
                lineNumber: 702,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "bg-neutral-50 border-2 border-neutral-300 p-4 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base font-semibold text-neutral-900",
                        children: "Dados do Contrato - Pessoa Física"
                    }, void 0, false, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 723,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "tipo_projeto",
                                className: "text-sm font-medium text-neutral-800",
                                children: [
                                    "Tipo de projeto ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-600",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 727,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 726,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                id: "tipo_projeto",
                                value: contratoData.tipo_projeto,
                                onChange: (e)=>{
                                    handleContratoInputChange("tipo_projeto", e.target.value);
                                    setQuickFillOptions({
                                        guardaCorpo: false,
                                        corrimao: false,
                                        box: false
                                    });
                                },
                                className: `w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${errors.tipo_projeto ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`,
                                placeholder: "Ex.: Guarda-corpo em inox, corrimão, etc."
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 729,
                                columnNumber: 11
                            }, this),
                            errors.tipo_projeto && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-red-600",
                                children: errors.tipo_projeto
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 741,
                                columnNumber: 35
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                id: "quick_guardacorpo",
                                                checked: quickFillOptions.guardaCorpo,
                                                onCheckedChange: (checked)=>handleQuickFillChange('guardaCorpo', checked),
                                                className: "border-2 border-neutral-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-form.tsx",
                                                lineNumber: 745,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "quick_guardacorpo",
                                                className: "text-sm text-neutral-800 cursor-pointer",
                                                children: "Guarda-corpo"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-form.tsx",
                                                lineNumber: 751,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 744,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                id: "quick_corrimao",
                                                checked: quickFillOptions.corrimao,
                                                onCheckedChange: (checked)=>handleQuickFillChange('corrimao', checked),
                                                className: "border-2 border-neutral-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-form.tsx",
                                                lineNumber: 760,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "quick_corrimao",
                                                className: "text-sm text-neutral-800 cursor-pointer",
                                                children: "Corrimão"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-form.tsx",
                                                lineNumber: 766,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 759,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                id: "quick_box",
                                                checked: quickFillOptions.box,
                                                onCheckedChange: (checked)=>handleQuickFillChange('box', checked),
                                                className: "border-2 border-neutral-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-form.tsx",
                                                lineNumber: 775,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "quick_box",
                                                className: "text-sm text-neutral-800 cursor-pointer",
                                                children: "Box"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-form.tsx",
                                                lineNumber: 781,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 774,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 743,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 725,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "nome_contrato",
                                className: "text-sm font-medium text-neutral-800",
                                children: [
                                    "Nome ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-600",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 793,
                                        columnNumber: 18
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 792,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                id: "nome_contrato",
                                value: contratoData.nome,
                                onChange: (e)=>handleContratoInputChange("nome", e.target.value),
                                className: `w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${errors.nome ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`,
                                placeholder: "Nome completo do contratante"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 795,
                                columnNumber: 11
                            }, this),
                            errors.nome && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-red-600",
                                children: errors.nome
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 804,
                                columnNumber: 27
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 791,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "telefone_contrato",
                                className: "text-sm font-medium text-neutral-800",
                                children: [
                                    "Telefone ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-600",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 809,
                                        columnNumber: 22
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 808,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                id: "telefone_contrato",
                                value: contratoData.telefone,
                                onChange: (e)=>handleContratoInputChange("telefone", e.target.value),
                                className: `w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${errors.telefone ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`,
                                placeholder: "(51) 99999-9999",
                                maxLength: 15
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 811,
                                columnNumber: 11
                            }, this),
                            errors.telefone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-red-600",
                                children: errors.telefone
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 821,
                                columnNumber: 31
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 807,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "endereco_contrato",
                                className: "text-sm font-medium text-neutral-800",
                                children: [
                                    "Endereço ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-600",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 826,
                                        columnNumber: 22
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 825,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                id: "endereco_contrato",
                                value: contratoData.endereco_contrato,
                                onChange: (e)=>handleContratoInputChange("endereco_contrato", e.target.value),
                                className: `w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${errors.endereco_contrato ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`,
                                placeholder: "Rua, número, bairro, cidade"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 828,
                                columnNumber: 11
                            }, this),
                            errors.endereco_contrato && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-red-600",
                                children: errors.endereco_contrato
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 837,
                                columnNumber: 40
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 824,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "cpf_contrato",
                                className: "text-sm font-medium text-neutral-800",
                                children: [
                                    "CPF ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-600",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 842,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 841,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                id: "cpf_contrato",
                                value: contratoData.cpf,
                                onChange: (e)=>handleContratoInputChange("cpf", e.target.value),
                                className: `w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${errors.cpf ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`,
                                placeholder: "000.000.000-00",
                                maxLength: 14
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 844,
                                columnNumber: 11
                            }, this),
                            errors.cpf && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-red-600",
                                children: errors.cpf
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 854,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 840,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "data_emissao_contrato",
                                className: "text-sm font-medium text-neutral-800",
                                children: [
                                    "Data de Emissão do Contrato ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-600",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 859,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 858,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 max-w-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "data_emissao_contrato",
                                        type: "date",
                                        value: contratoData.data_emissao_contrato,
                                        onChange: (e)=>handleDateChange(e.target.value),
                                        className: `flex-1 bg-white text-neutral-900 border-2 ${errors.data_emissao_contrato ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 862,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                id: "today_checkbox",
                                                checked: isToday,
                                                onCheckedChange: handleTodayCheckbox,
                                                className: "border-2 border-neutral-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-form.tsx",
                                                lineNumber: 872,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "today_checkbox",
                                                className: "text-sm text-neutral-800 cursor-pointer whitespace-nowrap",
                                                children: "Hoje"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-form.tsx",
                                                lineNumber: 878,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 871,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 861,
                                columnNumber: 11
                            }, this),
                            errors.data_emissao_contrato && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-red-600",
                                children: errors.data_emissao_contrato
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 886,
                                columnNumber: 44
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 857,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-sm font-medium text-neutral-800",
                                children: [
                                    "Forma Pagamento (Não parcelado) ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-600",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 891,
                                        columnNumber: 45
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 890,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                value: contratoData.forma_pagamento,
                                onValueChange: (value)=>handleContratoInputChange("forma_pagamento", value),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        "Transferência bancária (TED/PIX)",
                                        "Boleto bancário",
                                        "Dinheiro"
                                    ].map((forma)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                    value: forma,
                                                    id: `forma_pagamento_${forma}`,
                                                    className: "border-2 border-neutral-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/contrato-form.tsx",
                                                    lineNumber: 900,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: `forma_pagamento_${forma}`,
                                                    className: "cursor-pointer text-sm text-neutral-800",
                                                    children: forma
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/contrato-form.tsx",
                                                    lineNumber: 901,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, forma, true, {
                                            fileName: "[project]/components/forms/contrato-form.tsx",
                                            lineNumber: 899,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/forms/contrato-form.tsx",
                                    lineNumber: 897,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 893,
                                columnNumber: 11
                            }, this),
                            errors.forma_pagamento && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-red-600",
                                children: errors.forma_pagamento
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 908,
                                columnNumber: 38
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 889,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "valor_produtos",
                                className: "text-sm font-medium text-neutral-800",
                                children: [
                                    "Valor produtos e instalação ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-red-600",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 913,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 912,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                id: "valor_produtos",
                                value: contratoData.valor_produtos_instalacao,
                                onChange: (e)=>handleContratoInputChange("valor_produtos_instalacao", e.target.value),
                                className: `w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${errors.valor_produtos_instalacao ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`,
                                placeholder: "R$ 0,00"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 915,
                                columnNumber: 11
                            }, this),
                            errors.valor_produtos_instalacao && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-red-600",
                                children: errors.valor_produtos_instalacao
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 924,
                                columnNumber: 48
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 911,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "valor_entrada",
                                className: "text-sm font-medium text-neutral-800",
                                children: "Valor Entrada"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 928,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                id: "valor_entrada",
                                value: contratoData.valor_entrada,
                                onChange: (e)=>handleContratoInputChange("valor_entrada", e.target.value),
                                className: "w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900",
                                placeholder: "R$ 0,00"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 931,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 927,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "valor_desconto",
                                className: "text-sm font-medium text-neutral-800",
                                children: "Valor Desconto"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 941,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                id: "valor_desconto",
                                value: contratoData.valor_desconto,
                                onChange: (e)=>handleContratoInputChange("valor_desconto", e.target.value),
                                className: "w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900",
                                placeholder: "R$ 0,00"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 944,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 940,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "quantidade_parcelas",
                                className: "text-sm font-medium text-neutral-800",
                                children: "Quantidade Parcelas (Caso seja parcelado)"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 954,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                id: "quantidade_parcelas",
                                type: "number",
                                min: "1",
                                value: contratoData.quantidade_parcelas,
                                onChange: (e)=>handleContratoInputChange("quantidade_parcelas", e.target.value),
                                className: "w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900",
                                placeholder: "Ex.: 10"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 957,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 953,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-sm font-medium text-neutral-800",
                                children: "Forma Pagamento das Parcelas"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 969,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                value: contratoData.forma_pagamento_parcelas,
                                onValueChange: (value)=>handleContratoInputChange("forma_pagamento_parcelas", value),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        "Cartão de crédito",
                                        "Transferência bancária (TED/PIX)",
                                        "Boleto bancário"
                                    ].map((forma)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                    value: forma,
                                                    id: `forma_pagamento_parcelas_${forma}`,
                                                    className: "border-2 border-neutral-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/contrato-form.tsx",
                                                    lineNumber: 977,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: `forma_pagamento_parcelas_${forma}`,
                                                    className: "cursor-pointer text-sm text-neutral-800",
                                                    children: forma
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/contrato-form.tsx",
                                                    lineNumber: 982,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, forma, true, {
                                            fileName: "[project]/components/forms/contrato-form.tsx",
                                            lineNumber: 976,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/forms/contrato-form.tsx",
                                    lineNumber: 974,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 970,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 968,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "observacao_pagamento",
                                className: "text-sm font-medium text-neutral-800",
                                children: "Observação Sobre Pagamento"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 995,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                id: "observacao_pagamento",
                                rows: 3,
                                value: contratoData.observacao_pagamento,
                                onChange: (e)=>handleContratoInputChange("observacao_pagamento", e.target.value),
                                className: "w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 resize-none",
                                placeholder: "Alguma observação adicional sobre o pagamento..."
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 998,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 994,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-sm font-medium text-neutral-800",
                                children: "Foto do Orçamento"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 1009,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `transition-opacity duration-300 ${hasImage ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onDragOver: handleDragOver,
                                        onDragLeave: handleDragLeave,
                                        onDrop: handleDrop,
                                        className: `border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragOver ? "border-neutral-900 bg-neutral-100" : "border-neutral-400 bg-white hover:border-neutral-600"}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                    className: "w-10 h-10 text-neutral-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/contrato-form.tsx",
                                                    lineNumber: 1022,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-neutral-600",
                                                    children: "Arraste e solte a imagem aqui"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/contrato-form.tsx",
                                                    lineNumber: 1023,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-neutral-500",
                                                    children: [
                                                        "ou pressione ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                                            className: "px-2 py-1 bg-neutral-200 rounded text-xs font-mono",
                                                            children: "Ctrl+V"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/contrato-form.tsx",
                                                            lineNumber: 1024,
                                                            columnNumber: 70
                                                        }, this),
                                                        " para colar"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/forms/contrato-form.tsx",
                                                    lineNumber: 1024,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-neutral-400",
                                                    children: "PNG, JPG ou JPEG"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/contrato-form.tsx",
                                                    lineNumber: 1025,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/contrato-form.tsx",
                                            lineNumber: 1021,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 1011,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3 mt-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            type: "button",
                                            variant: "outline",
                                            onClick: ()=>fileInputRef.current?.click(),
                                            className: "flex-1 border-2 border-neutral-400 hover:border-neutral-900 hover:bg-neutral-100 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__["ImageIcon"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/contrato-form.tsx",
                                                    lineNumber: 1035,
                                                    columnNumber: 17
                                                }, this),
                                                "Selecionar Imagem"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/contrato-form.tsx",
                                            lineNumber: 1029,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 1028,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 1010,
                                columnNumber: 11
                            }, this),
                            hasImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative inline-block transition-opacity duration-300",
                                onMouseEnter: ()=>setShowThumbnailHover(true),
                                onMouseLeave: ()=>setShowThumbnailHover(false),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 bg-neutral-200 rounded-lg px-3 py-2 cursor-pointer group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__["ImageIcon"], {
                                            className: "w-6 h-6 text-neutral-500"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/contrato-form.tsx",
                                            lineNumber: 1048,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-neutral-700 font-medium",
                                            children: "Foto do orçamento"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/contrato-form.tsx",
                                            lineNumber: 1049,
                                            columnNumber: 17
                                        }, this),
                                        showThumbnailHover && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: handleRemoveImage,
                                            className: "absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center transition-opacity",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-6 h-6 text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-form.tsx",
                                                lineNumber: 1055,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/contrato-form.tsx",
                                            lineNumber: 1051,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/contrato-form.tsx",
                                    lineNumber: 1047,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 1042,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: fileInputRef,
                                type: "file",
                                accept: "image/png,image/jpeg,image/jpg",
                                onChange: handleFileUpload,
                                className: "hidden"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 1062,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 1008,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleSubmit,
                            disabled: isSubmitting,
                            className: "w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                            children: isSubmitting ? "Gerando contrato..." : "Gerar Contrato"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-form.tsx",
                            lineNumber: 1072,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 1071,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/forms/contrato-form.tsx",
                lineNumber: 722,
                columnNumber: 7
            }, this),
            submittedPayload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "bg-neutral-50 border-2 border-neutral-300 p-4 mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"], {
                                        className: "w-5 h-5 text-neutral-700"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 1086,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-sm font-semibold text-neutral-900",
                                        children: "Informações técnicas"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-form.tsx",
                                        lineNumber: 1087,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 1085,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                className: "w-5 h-5 text-green-600"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-form.tsx",
                                lineNumber: 1089,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 1084,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-96 overflow-y-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs bg-white p-3 rounded border border-neutral-200 space-y-1",
                            children: Object.entries(submittedPayload).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-neutral-600 font-medium whitespace-nowrap",
                                            children: [
                                                key,
                                                ":"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/contrato-form.tsx",
                                            lineNumber: 1095,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-neutral-900 flex-1 cursor-pointer hover:bg-neutral-100 px-1 rounded transition-colors",
                                            title: String(value),
                                            onClick: ()=>handleCopyValue(value),
                                            children: truncateValue(value)
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/contrato-form.tsx",
                                            lineNumber: 1096,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/components/forms/contrato-form.tsx",
                                    lineNumber: 1094,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-form.tsx",
                            lineNumber: 1092,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/forms/contrato-form.tsx",
                        lineNumber: 1091,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/forms/contrato-form.tsx",
                lineNumber: 1083,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(ContratoForm, "iXYg1kRM9+NoT+2hifo1Hsl/vFo=");
_c = ContratoForm;
var _c;
__turbopack_context__.k.register(_c, "ContratoForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/forms/contrato-juridica-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContratoJuridicaForm",
    ()=>ContratoJuridicaForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/radio-group.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/checkbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as ImageIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eraser.js [app-client] (ecmascript) <export default as Eraser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code.js [app-client] (ecmascript) <export default as Code>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const numberToWordsFull = (num)=>{
    if (num === 0) return "zero reais";
    const unidades = [
        "",
        "um",
        "dois",
        "três",
        "quatro",
        "cinco",
        "seis",
        "sete",
        "oito",
        "nove"
    ];
    const especiais = [
        "dez",
        "onze",
        "doze",
        "treze",
        "quatorze",
        "quinze",
        "dezesseis",
        "dezessete",
        "dezoito",
        "dezenove"
    ];
    const dezenas = [
        "",
        "",
        "vinte",
        "trinta",
        "quarenta",
        "cinquenta",
        "sessenta",
        "setenta",
        "oitenta",
        "noventa"
    ];
    const centenas = [
        "",
        "cem",
        "duzentos",
        "trezentos",
        "quatrocentos",
        "quinhentos",
        "seiscentos",
        "setecentos",
        "oitocentos",
        "novecentos"
    ];
    const convertirGrupo = (n)=>{
        if (n === 0) return "";
        if (n === 100) return "cem";
        let resultado = "";
        const c = Math.floor(n / 100);
        const d = Math.floor(n % 100 / 10);
        const u = n % 10;
        if (c > 0) resultado += centenas[c];
        if (d === 1) {
            if (resultado) resultado += " e ";
            resultado += especiais[u];
            return resultado;
        }
        if (d > 1) {
            if (resultado) resultado += " e ";
            resultado += dezenas[d];
        }
        if (u > 0) {
            if (resultado && d !== 1) resultado += " e ";
            else if (resultado) resultado += " ";
            resultado += unidades[u];
        }
        return resultado;
    };
    const inteiro = Math.floor(num);
    const centavos = Math.round((num - inteiro) * 100);
    let texto = "";
    // Milhões
    const milhoes = Math.floor(inteiro / 1000000);
    if (milhoes > 0) {
        if (milhoes === 1) {
            texto = "um milhão";
        } else {
            texto = convertirGrupo(milhoes) + " milhões";
        }
    }
    // Milhares
    const milhares = Math.floor(inteiro % 1000000 / 1000);
    if (milhares > 0) {
        if (texto) texto += " e ";
        if (milhares === 1) {
            texto += "mil";
        } else {
            texto += convertirGrupo(milhares) + " mil";
        }
    }
    // Centenas
    const resto = inteiro % 1000;
    if (resto > 0) {
        if (texto && resto < 100) texto += " e ";
        else if (texto) texto += " ";
        texto += convertirGrupo(resto);
    }
    // Adiciona "reais"
    if (inteiro === 1) {
        texto += " real";
    } else {
        texto += " reais";
    }
    // Centavos
    if (centavos > 0) {
        texto += " e " + convertirGrupo(centavos);
        texto += centavos === 1 ? " centavo" : " centavos";
    }
    return texto;
};
const formatCurrency = (value)=>{
    const numbers = value.replace(/\D/g, "");
    if (!numbers) return "";
    const amount = Number.parseFloat(numbers) / 100;
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(amount);
};
const parseCurrency = (value)=>{
    if (!value) return 0;
    const numbers = value.replace(/\D/g, "");
    return Number.parseFloat(numbers) / 100;
};
const formatPhone = (value)=>{
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
        return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
};
const formatCNPJ = (value)=>{
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, "$1.$2.$3/$4-$5").replace(/-$/, "");
};
const formatCPF = (value)=>{
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4").replace(/-$/, "");
};
function ContratoJuridicaForm({ gerarContrato, setGerarContrato, tipoContrato, setTipoContrato, contratoData, setContratoData, errors, setErrors }) {
    _s();
    const [fotoOrcamentoBase64, setFotoOrcamentoBase64] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDragOver, setIsDragOver] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSuccessToast, setShowSuccessToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showWarningToast, setShowWarningToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showMissingFieldsToast, setShowMissingFieldsToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showClearFieldsToast, setShowClearFieldsToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCopyToast, setShowCopyToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasImage, setHasImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showThumbnailHover, setShowThumbnailHover] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isToday, setIsToday] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [quickFillOptions, setQuickFillOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        guardaCorpo: false,
        corrimao: false,
        box: false
    });
    const [driveLink, setDriveLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [showLoadingModal, setShowLoadingModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [callbackId, setCallbackId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoadingComplete, setIsLoadingComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submittedPayload, setSubmittedPayload] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContratoJuridicaForm.useEffect": ()=>{
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            setContratoData({
                "ContratoJuridicaForm.useEffect": (prev)=>({
                        ...prev,
                        data_emissao_contrato: formattedDate
                    })
            }["ContratoJuridicaForm.useEffect"]);
        }
    }["ContratoJuridicaForm.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContratoJuridicaForm.useEffect": ()=>{
            const handlePaste = {
                "ContratoJuridicaForm.useEffect.handlePaste": async (e)=>{
                    if (hasImage) {
                        setShowWarningToast(true);
                        return;
                    }
                    const items = e.clipboardData?.items;
                    if (!items) return;
                    for (const item of items){
                        if (item.type.startsWith('image/')) {
                            const file = item.getAsFile();
                            if (file) {
                                await processImageFile(file);
                            }
                        }
                    }
                }
            }["ContratoJuridicaForm.useEffect.handlePaste"];
            document.addEventListener('paste', handlePaste);
            return ({
                "ContratoJuridicaForm.useEffect": ()=>document.removeEventListener('paste', handlePaste)
            })["ContratoJuridicaForm.useEffect"];
        }
    }["ContratoJuridicaForm.useEffect"], [
        hasImage
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContratoJuridicaForm.useEffect": ()=>{
            if (showSuccessToast) {
                const timer = setTimeout({
                    "ContratoJuridicaForm.useEffect.timer": ()=>{
                        setShowSuccessToast(false);
                    }
                }["ContratoJuridicaForm.useEffect.timer"], 5000);
                return ({
                    "ContratoJuridicaForm.useEffect": ()=>clearTimeout(timer)
                })["ContratoJuridicaForm.useEffect"];
            }
        }
    }["ContratoJuridicaForm.useEffect"], [
        showSuccessToast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContratoJuridicaForm.useEffect": ()=>{
            if (showWarningToast) {
                const timer = setTimeout({
                    "ContratoJuridicaForm.useEffect.timer": ()=>{
                        setShowWarningToast(false);
                    }
                }["ContratoJuridicaForm.useEffect.timer"], 5000);
                return ({
                    "ContratoJuridicaForm.useEffect": ()=>clearTimeout(timer)
                })["ContratoJuridicaForm.useEffect"];
            }
        }
    }["ContratoJuridicaForm.useEffect"], [
        showWarningToast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContratoJuridicaForm.useEffect": ()=>{
            if (showMissingFieldsToast) {
                const timer = setTimeout({
                    "ContratoJuridicaForm.useEffect.timer": ()=>{
                        setShowMissingFieldsToast(false);
                    }
                }["ContratoJuridicaForm.useEffect.timer"], 5000);
                return ({
                    "ContratoJuridicaForm.useEffect": ()=>clearTimeout(timer)
                })["ContratoJuridicaForm.useEffect"];
            }
        }
    }["ContratoJuridicaForm.useEffect"], [
        showMissingFieldsToast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContratoJuridicaForm.useEffect": ()=>{
            if (showClearFieldsToast) {
                const timer = setTimeout({
                    "ContratoJuridicaForm.useEffect.timer": ()=>{
                        setShowClearFieldsToast(false);
                    }
                }["ContratoJuridicaForm.useEffect.timer"], 5000);
                return ({
                    "ContratoJuridicaForm.useEffect": ()=>clearTimeout(timer)
                })["ContratoJuridicaForm.useEffect"];
            }
        }
    }["ContratoJuridicaForm.useEffect"], [
        showClearFieldsToast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContratoJuridicaForm.useEffect": ()=>{
            if (showCopyToast) {
                const timer = setTimeout({
                    "ContratoJuridicaForm.useEffect.timer": ()=>{
                        setShowCopyToast(false);
                    }
                }["ContratoJuridicaForm.useEffect.timer"], 3000);
                return ({
                    "ContratoJuridicaForm.useEffect": ()=>clearTimeout(timer)
                })["ContratoJuridicaForm.useEffect"];
            }
        }
    }["ContratoJuridicaForm.useEffect"], [
        showCopyToast
    ]);
    const handleContratoInputChange = (field, value)=>{
        let formattedValue = value;
        if (field === "telefone" || field === "telefone_representante") {
            formattedValue = formatPhone(value);
        } else if (field === "cnpj") {
            formattedValue = formatCNPJ(value);
        } else if (field === "cpf_representante") {
            formattedValue = formatCPF(value);
        } else if (field === "valor_produtos_instalacao" || field === "valor_entrada" || field === "valor_desconto") {
            formattedValue = formatCurrency(value);
        }
        setContratoData((prev)=>({
                ...prev,
                [field]: formattedValue
            }));
        if (errors[field]) {
            setErrors((prev)=>({
                    ...prev,
                    [field]: ""
                }));
        }
    };
    const handleDateChange = (value)=>{
        setContratoData((prev)=>({
                ...prev,
                data_emissao_contrato: value
            }));
        const today = new Date().toISOString().split('T')[0];
        setIsToday(value === today);
        if (errors.data_emissao_contrato) {
            setErrors((prev)=>({
                    ...prev,
                    data_emissao_contrato: ""
                }));
        }
    };
    const handleTodayCheckbox = (checked)=>{
        setIsToday(checked);
        if (checked) {
            const today = new Date().toISOString().split('T')[0];
            setContratoData((prev)=>({
                    ...prev,
                    data_emissao_contrato: today
                }));
        }
    };
    const convertToBase64 = (file)=>{
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.onload = ()=>{
                if (typeof reader.result === "string") {
                    resolve(reader.result);
                } else {
                    reject(new Error("Failed to convert file to base64"));
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };
    const isImageFile = (file)=>{
        return file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg";
    };
    const processImageFile = async (file)=>{
        if (hasImage) {
            setShowWarningToast(true);
            return;
        }
        if (isImageFile(file)) {
            try {
                const base64 = await convertToBase64(file);
                setFotoOrcamentoBase64(base64);
                setHasImage(true);
                setShowSuccessToast(true);
            } catch (error) {
                console.error("Error converting file to base64:", error);
            }
        } else {
            alert("Por favor, selecione apenas arquivos de imagem (PNG, JPG ou JPEG)");
        }
    };
    const handleFileUpload = async (event)=>{
        const file = event.target.files?.[0];
        if (file) {
            await processImageFile(file);
        }
    };
    const handleDragOver = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };
    const handleDragLeave = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };
    const handleDrop = async (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            await processImageFile(file);
        }
    };
    const handleRemoveImage = ()=>{
        setFotoOrcamentoBase64(null);
        setHasImage(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    const pollForCallback = async (id)=>{
        const maxAttempts = 60;
        let attempts = 0;
        const poll = async ()=>{
            if (attempts >= maxAttempts) {
                return null;
            }
            try {
                const response = await fetch(`/api/callback/check/${id}`);
                const result = await response.json();
                if (result.driveLink) {
                    return result.driveLink;
                }
                await new Promise((resolve)=>setTimeout(resolve, 5000));
                attempts++;
                return poll();
            } catch (error) {
                console.error("[v0] Error polling for callback:", error);
                await new Promise((resolve)=>setTimeout(resolve, 5000));
                attempts++;
                return poll();
            }
        };
        return poll();
    };
    const handleSubmit = async ()=>{
        const newErrors = {};
        if (!contratoData.tipo_projeto) newErrors.tipo_projeto = "Campo obrigatório";
        if (!contratoData.nome) newErrors.nome = "Campo obrigatório";
        if (!contratoData.telefone) newErrors.telefone = "Campo obrigatório";
        if (!contratoData.endereco_contrato) newErrors.endereco_contrato = "Campo obrigatório";
        if (!contratoData.cnpj) newErrors.cnpj = "Campo obrigatório";
        if (!contratoData.nome_representante) newErrors.nome_representante = "Campo obrigatório";
        if (!contratoData.cargo_representante) newErrors.cargo_representante = "Campo obrigatório";
        if (!contratoData.cpf_representante) newErrors.cpf_representante = "Campo obrigatório";
        if (!contratoData.telefone_representante) newErrors.telefone_representante = "Campo obrigatório";
        if (!contratoData.forma_pagamento) newErrors.forma_pagamento = "Campo obrigatório";
        if (!contratoData.valor_produtos_instalacao) newErrors.valor_produtos_instalacao = "Campo obrigatório";
        if (!contratoData.data_emissao_contrato) newErrors.data_emissao_contrato = "Campo obrigatório";
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // Show toast
            setShowMissingFieldsToast(true);
            // Find first error field and scroll to it
            const firstErrorField = Object.keys(newErrors)[0];
            const fieldElement = document.getElementById(firstErrorField === 'tipo_projeto' ? 'tipo_projeto' : firstErrorField === 'nome' ? 'nome_contrato' : firstErrorField === 'cnpj' ? 'cnpj_contrato' : firstErrorField === 'endereco_contrato' ? 'endereco_contrato' : firstErrorField === 'nome_representante' ? 'nome_representante' : firstErrorField === 'cargo_representante' ? 'cargo_representante' : firstErrorField === 'cpf_representante' ? 'cpf_representante' : firstErrorField === 'telefone_representante' ? 'telefone_representante' : firstErrorField === 'forma_pagamento' ? 'forma_pagamento_juridica_Transferência bancária (TED/PIX)' : firstErrorField === 'valor_produtos_instalacao' ? 'valor_produtos' : 'data_emissao_contrato');
            if (fieldElement) {
                const elementPosition = fieldElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - window.innerHeight / 2 + fieldElement.offsetHeight / 2;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            return;
        }
        const valorProdutosNum = parseCurrency(contratoData.valor_produtos_instalacao);
        const valorDescontoNum = parseCurrency(contratoData.valor_desconto);
        const valorFinalNumero = valorProdutosNum - valorDescontoNum;
        const quantidadeParcelas = Number.parseInt(contratoData.quantidade_parcelas) || 1;
        const valorParcelasNumero = valorFinalNumero / quantidadeParcelas;
        const valorFinalFormatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(valorFinalNumero);
        const valorParcelasFormatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(valorParcelasNumero);
        const valorTotalExtenso = numberToWordsFull(valorFinalNumero);
        const valorParcelaExtenso = numberToWordsFull(valorParcelasNumero);
        const payload = {
            tipo_projeto: contratoData.tipo_projeto,
            nome_contratante: contratoData.nome,
            telefone_contratante: contratoData.telefone,
            endereco_contratante: contratoData.endereco_contrato,
            cnpj_contratante: contratoData.cnpj,
            nome_representante: contratoData.nome_representante,
            cpf_representante: contratoData.cpf_representante,
            telefone_representante: contratoData.telefone_representante,
            cargo_representante: contratoData.cargo_representante,
            forma_pagamento_nao_parcelado: contratoData.forma_pagamento,
            valor_produtos_instalacao: contratoData.valor_produtos_instalacao,
            valor_entrada: contratoData.valor_entrada || "",
            valor_desconto: contratoData.valor_desconto || "",
            quantidade_parcelas: contratoData.quantidade_parcelas || "1",
            forma_pagamento_parcelas: contratoData.forma_pagamento_parcelas || "",
            observacao_pagamento: contratoData.observacao_pagamento || "",
            data_emissao_contrato: contratoData.data_emissao_contrato,
            valor_final: valorFinalFormatted,
            valor_total_extenso: valorTotalExtenso,
            valor_parcelas: valorParcelasFormatted,
            valor_parcela_extenso: valorParcelaExtenso,
            foto_orcamento_base64: fotoOrcamentoBase64 || null
        };
        setIsSubmitting(true);
        setShowLoadingModal(true);
        setIsLoadingComplete(false);
        setSubmittedPayload(payload);
        setCountdown(10);
        try {
            console.log("[v0] Enviando contrato pessoa jurídica para n8n...");
            console.log("[v0] Payload:", JSON.stringify(payload, null, 2));
            const response = await fetch("/api/contrato-juridica", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            console.log("[v0] Resposta da API:", result);
            if (!response.ok || !result.success) {
                throw new Error(result.error || "Erro ao enviar contrato");
            }
            console.log("[v0] Contrato enviado com sucesso!");
        } catch (error) {
            console.error("[v0] Erro ao enviar contrato:", error);
            alert("❌ Erro ao enviar contrato. Por favor, tente novamente."); // Changed alert message
        } finally{
            const countdownInterval = setInterval(()=>{
                setCountdown((prev)=>{
                    if (prev <= 1) {
                        clearInterval(countdownInterval);
                        setIsLoadingComplete(true);
                        setIsSubmitting(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    };
    const handleQuickFillChange = (option, checked)=>{
        const newOptions = {
            ...quickFillOptions,
            [option]: checked
        };
        setQuickFillOptions(newOptions);
        const selectedOptions = [];
        if (newOptions.guardaCorpo) selectedOptions.push('Guarda-corpo');
        if (newOptions.corrimao) selectedOptions.push('corrimão');
        if (newOptions.box) selectedOptions.push('box');
        let tipoProjeto = '';
        if (selectedOptions.length === 1) {
            tipoProjeto = selectedOptions[0];
        } else if (selectedOptions.length === 2) {
            tipoProjeto = `${selectedOptions[0]} e ${selectedOptions[1]}`;
        } else if (selectedOptions.length === 3) {
            tipoProjeto = `${selectedOptions[0]}, ${selectedOptions[1]} e ${selectedOptions[2]}`;
        }
        handleContratoInputChange('tipo_projeto', tipoProjeto);
    };
    const hasAnyFieldContent = ()=>{
        return contratoData.tipo_projeto || contratoData.nome || contratoData.telefone || contratoData.endereco_contrato || contratoData.cnpj || contratoData.nome_representante || contratoData.cpf_representante || contratoData.telefone_representante || contratoData.cargo_representante || contratoData.forma_pagamento || contratoData.valor_produtos_instalacao || contratoData.valor_entrada || contratoData.valor_desconto || contratoData.quantidade_parcelas || contratoData.forma_pagamento_parcelas || contratoData.observacao_pagamento || hasImage;
    };
    const handleClearAllFields = ()=>{
        setContratoData({
            tipo_projeto: "",
            nome: "",
            telefone: "",
            endereco_contrato: "",
            cnpj: "",
            nome_representante: "",
            cpf_representante: "",
            telefone_representante: "",
            cargo_representante: "",
            forma_pagamento: "",
            valor_produtos_instalacao: "",
            valor_entrada: "",
            valor_desconto: "",
            quantidade_parcelas: "",
            forma_pagamento_parcelas: "",
            observacao_pagamento: "",
            data_emissao_contrato: new Date().toISOString().split('T')[0]
        });
        setFotoOrcamentoBase64(null);
        setHasImage(false);
        setQuickFillOptions({
            guardaCorpo: false,
            corrimao: false,
            box: false
        });
        setErrors({});
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setShowClearFieldsToast(true);
    };
    const handleCopyValue = async (value)=>{
        const textToCopy = typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value);
        try {
            await navigator.clipboard.writeText(textToCopy);
            setShowCopyToast(true);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };
    const truncateValue = (value)=>{
        const str = typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value);
        return str.length > 30 ? `${str.substring(0, 30)}...` : str;
    };
    const handleCloseModal = ()=>{
        setShowLoadingModal(false);
    };
    if (!gerarContrato || tipoContrato !== "juridica") {
        return null;
    }
    const DRIVE_LINK = 'https://drive.google.com/drive/u/0/folders/1f_3jWgVene_ZLPT80qJFNbS61SvYAnKr';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            showLoadingModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-6 w-[400px] min-h-[340px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleCloseModal,
                            className: "absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors",
                            "aria-label": "Fechar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 695,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                            lineNumber: 690,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-20 relative flex-shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/google_drive.svg",
                                alt: "Google Drive",
                                className: `w-full h-full object-contain drop-shadow-lg transition-all duration-500`,
                                style: {
                                    filter: !isLoadingComplete ? 'grayscale(100%)' : 'none'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 699,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                            lineNumber: 698,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-4 flex-1 justify-center",
                            style: {
                                minHeight: '140px'
                            },
                            children: !isLoadingComplete ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "w-8 h-8 animate-spin text-blue-600"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 710,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-semibold text-neutral-900",
                                        children: "Gerando contrato..."
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 711,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-neutral-600 text-center",
                                        children: [
                                            "Gerando seu documento em ",
                                            countdown,
                                            " segundos"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 712,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-semibold text-green-600",
                                        children: "Seu arquivo está pronto"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 716,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: DRIVE_LINK,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-5 h-5",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                    lineNumber: 724,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 723,
                                                columnNumber: 21
                                            }, this),
                                            "Acessar pasta do arquivo"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 717,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                            lineNumber: 707,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                    lineNumber: 689,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                lineNumber: 688,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed bottom-6 right-6 z-50 transition-all duration-500 ${showSuccessToast ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`,
                style: {
                    maxHeight: '120px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                            className: "w-5 h-5 text-green-500"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                            lineNumber: 744,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium",
                            children: "Foto de orçamento anexada"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                            lineNumber: 745,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                    lineNumber: 743,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                lineNumber: 735,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed bottom-6 right-6 z-50 transition-all duration-500 ${showWarningToast ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`,
                style: {
                    maxHeight: '120px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                            className: "w-5 h-5 text-yellow-500"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                            lineNumber: 758,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium",
                            children: "Só é possível enviar uma foto de orçamento."
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                            lineNumber: 759,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                    lineNumber: 757,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                lineNumber: 749,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed bottom-6 right-6 z-50 transition-all duration-500 ${showMissingFieldsToast ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`,
                style: {
                    maxHeight: '120px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                            className: "w-5 h-5 text-yellow-500"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                            lineNumber: 772,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium",
                            children: "Preencha todos os campos obrigatórios"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                            lineNumber: 773,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                    lineNumber: 771,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                lineNumber: 763,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed bottom-6 right-6 z-50 transition-all duration-500 ${showClearFieldsToast ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`,
                style: {
                    maxHeight: '120px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__["Eraser"], {
                            className: "w-5 h-5 text-white"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                            lineNumber: 786,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium",
                            children: "Todos os campos foram limpos"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                            lineNumber: 787,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                    lineNumber: 785,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                lineNumber: 777,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed bottom-6 right-6 z-50 transition-all duration-500 ${showCopyToast ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`,
                style: {
                    maxHeight: '120px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                            className: "w-5 h-5 text-white"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                            lineNumber: 800,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium",
                            children: "Valor copiado!"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                            lineNumber: 801,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                    lineNumber: 799,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                lineNumber: 791,
                columnNumber: 7
            }, this),
            hasAnyFieldContent() && !showLoadingModal && isLoadingComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleClearAllFields,
                className: "fixed right-6 z-40 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-3 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2",
                style: {
                    bottom: '24px'
                },
                "aria-label": "Limpar todos os campos",
                title: "Limpar todos os campos",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__["Eraser"], {
                        className: "w-5 h-5 text-white"
                    }, void 0, false, {
                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                        lineNumber: 813,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium",
                        children: "Limpar campos"
                    }, void 0, false, {
                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                        lineNumber: 814,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                lineNumber: 806,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "bg-neutral-50 border-2 border-neutral-300 p-4 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base font-semibold text-neutral-900",
                        children: "Dados do Contrato - Pessoa Jurídica"
                    }, void 0, false, {
                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                        lineNumber: 819,
                        columnNumber: 9
                    }, this),
                    driveLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-green-50 border-2 border-green-500 rounded-lg p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                    className: "w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                                }, void 0, false, {
                                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                    lineNumber: 824,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-sm font-semibold text-green-900 mb-2",
                                            children: "Contrato gerado com sucesso!"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                            lineNumber: 826,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-green-800 mb-3",
                                            children: "O contrato foi enviado e está disponível na pasta:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                            lineNumber: 827,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: driveLink,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                        lineNumber: 835,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                    lineNumber: 834,
                                                    columnNumber: 19
                                                }, this),
                                                "Acessar pasta"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                            lineNumber: 828,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                    lineNumber: 825,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                            lineNumber: 823,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                        lineNumber: 822,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 pt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-bold text-neutral-900 uppercase tracking-wide",
                                children: "Dados da empresa"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 845,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "tipo_projeto",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: [
                                            "Tipo de projeto ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 849,
                                                columnNumber: 31
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 848,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "tipo_projeto",
                                        value: contratoData.tipo_projeto,
                                        onChange: (e)=>{
                                            handleContratoInputChange("tipo_projeto", e.target.value);
                                            setQuickFillOptions({
                                                guardaCorpo: false,
                                                corrimao: false,
                                                box: false
                                            });
                                        },
                                        className: `w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${errors.tipo_projeto ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`,
                                        placeholder: "Ex.: Guarda-corpo em inox, corrimão, etc."
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 851,
                                        columnNumber: 13
                                    }, this),
                                    errors.tipo_projeto && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-600",
                                        children: errors.tipo_projeto
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 863,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4 pt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                        id: "quick_guardacorpo_juridica",
                                                        checked: quickFillOptions.guardaCorpo,
                                                        onCheckedChange: (checked)=>handleQuickFillChange('guardaCorpo', checked),
                                                        className: "border-2 border-neutral-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                        lineNumber: 867,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                        htmlFor: "quick_guardacorpo_juridica",
                                                        className: "text-sm text-neutral-800 cursor-pointer",
                                                        children: "Guarda-corpo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                        lineNumber: 873,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 866,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                        id: "quick_corrimao_juridica",
                                                        checked: quickFillOptions.corrimao,
                                                        onCheckedChange: (checked)=>handleQuickFillChange('corrimao', checked),
                                                        className: "border-2 border-neutral-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                        lineNumber: 882,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                        htmlFor: "quick_corrimao_juridica",
                                                        className: "text-sm text-neutral-800 cursor-pointer",
                                                        children: "Corrimão"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                        lineNumber: 888,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 881,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                        id: "quick_box_juridica",
                                                        checked: quickFillOptions.box,
                                                        onCheckedChange: (checked)=>handleQuickFillChange('box', checked),
                                                        className: "border-2 border-neutral-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                        lineNumber: 897,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                        htmlFor: "quick_box_juridica",
                                                        className: "text-sm text-neutral-800 cursor-pointer",
                                                        children: "Box"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                        lineNumber: 903,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 896,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 865,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 847,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "nome_contrato",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: [
                                            "Razão Social ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 915,
                                                columnNumber: 28
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 914,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "nome_contrato",
                                        value: contratoData.nome,
                                        onChange: (e)=>handleContratoInputChange("nome", e.target.value),
                                        className: `w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${errors.nome ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`,
                                        placeholder: "Razão social da empresa"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 917,
                                        columnNumber: 13
                                    }, this),
                                    errors.nome && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-600",
                                        children: errors.nome
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 926,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 913,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "telefone_contrato_juridica",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: [
                                            "Telefone ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 931,
                                                columnNumber: 24
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 930,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "telefone_contrato_juridica",
                                        value: contratoData.telefone,
                                        onChange: (e)=>handleContratoInputChange("telefone", e.target.value),
                                        className: `w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${errors.telefone ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`,
                                        placeholder: "(51) 99999-9999",
                                        maxLength: 15
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 933,
                                        columnNumber: 13
                                    }, this),
                                    errors.telefone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-600",
                                        children: errors.telefone
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 943,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 929,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "cnpj_contrato",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: [
                                            "CNPJ ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 948,
                                                columnNumber: 20
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 947,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "cnpj_contrato",
                                        value: contratoData.cnpj,
                                        onChange: (e)=>handleContratoInputChange("cnpj", e.target.value),
                                        className: `w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${errors.cnpj ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`,
                                        placeholder: "00.000.000/0000-00",
                                        maxLength: 18
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 950,
                                        columnNumber: 13
                                    }, this),
                                    errors.cnpj && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-600",
                                        children: errors.cnpj
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 960,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 946,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "endereco_contrato",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: [
                                            "Endereço ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 965,
                                                columnNumber: 24
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 964,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "endereco_contrato",
                                        value: contratoData.endereco_contrato,
                                        onChange: (e)=>handleContratoInputChange("endereco_contrato", e.target.value),
                                        className: `w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${errors.endereco_contrato ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`,
                                        placeholder: "Rua, número, bairro, cidade"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 967,
                                        columnNumber: 13
                                    }, this),
                                    errors.endereco_contrato && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-600",
                                        children: errors.endereco_contrato
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 976,
                                        columnNumber: 42
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 963,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                        lineNumber: 844,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 pt-4 border-t-2 border-neutral-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-bold text-neutral-900 uppercase tracking-wide",
                                children: "Dados do representante legal"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 981,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "nome_representante",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: [
                                            "Nome do representante ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 985,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 984,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "nome_representante",
                                        value: contratoData.nome_representante,
                                        onChange: (e)=>handleContratoInputChange("nome_representante", e.target.value),
                                        className: `w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${errors.nome_representante ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`,
                                        placeholder: "Nome completo do representante"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 987,
                                        columnNumber: 13
                                    }, this),
                                    errors.nome_representante && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-600",
                                        children: errors.nome_representante
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 996,
                                        columnNumber: 43
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 983,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "cargo_representante",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: [
                                            "Cargo ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 1001,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1000,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "cargo_representante",
                                        value: contratoData.cargo_representante,
                                        onChange: (e)=>handleContratoInputChange("cargo_representante", e.target.value),
                                        className: `w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${errors.cargo_representante ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`,
                                        placeholder: "Ex: Diretor, Gerente, Sócio"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1003,
                                        columnNumber: 13
                                    }, this),
                                    errors.cargo_representante && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-600",
                                        children: errors.cargo_representante
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1012,
                                        columnNumber: 44
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 999,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "cpf_representante",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: [
                                            "CPF ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 1017,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1016,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "cpf_representante",
                                        value: contratoData.cpf_representante,
                                        onChange: (e)=>handleContratoInputChange("cpf_representante", e.target.value),
                                        className: `w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${errors.cpf_representante ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`,
                                        placeholder: "000.000.000-00",
                                        maxLength: 14
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1019,
                                        columnNumber: 13
                                    }, this),
                                    errors.cpf_representante && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-600",
                                        children: errors.cpf_representante
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1029,
                                        columnNumber: 42
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 1015,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "telefone_representante",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: [
                                            "Telefone ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 1034,
                                                columnNumber: 24
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1033,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "telefone_representante",
                                        value: contratoData.telefone_representante,
                                        onChange: (e)=>handleContratoInputChange("telefone_representante", e.target.value),
                                        className: `w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${errors.telefone_representante ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`,
                                        placeholder: "(51) 99999-9999",
                                        maxLength: 15
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1036,
                                        columnNumber: 13
                                    }, this),
                                    errors.telefone_representante && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-600",
                                        children: errors.telefone_representante
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1046,
                                        columnNumber: 47
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 1032,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                        lineNumber: 980,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 pt-4 border-t-2 border-neutral-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "data_emissao_contrato",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: [
                                            "Data de Emissão do Contrato ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 1053,
                                                columnNumber: 43
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1052,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 max-w-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                id: "data_emissao_contrato",
                                                type: "date",
                                                value: contratoData.data_emissao_contrato,
                                                onChange: (e)=>handleDateChange(e.target.value),
                                                className: `flex-1 bg-white text-neutral-900 border-2 ${errors.data_emissao_contrato ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 1056,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                        id: "today_checkbox",
                                                        checked: isToday,
                                                        onCheckedChange: handleTodayCheckbox,
                                                        className: "border-2 border-neutral-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                        lineNumber: 1066,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                        htmlFor: "today_checkbox",
                                                        className: "text-sm text-neutral-800 cursor-pointer whitespace-nowrap",
                                                        children: "Hoje"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                        lineNumber: 1072,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 1065,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1055,
                                        columnNumber: 13
                                    }, this),
                                    errors.data_emissao_contrato && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-600",
                                        children: errors.data_emissao_contrato
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1080,
                                        columnNumber: 46
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 1051,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-sm font-medium text-neutral-800",
                                        children: [
                                            "Forma Pagamento (Não parcelado) ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 1085,
                                                columnNumber: 47
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1084,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                        value: contratoData.forma_pagamento,
                                        onValueChange: (value)=>handleContratoInputChange("forma_pagamento", value),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                "Transferência bancária (TED/PIX)",
                                                "Boleto bancário",
                                                "Dinheiro"
                                            ].map((forma)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                            value: forma,
                                                            id: `forma_pagamento_juridica_${forma}`,
                                                            className: "border-2 border-neutral-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                            lineNumber: 1094,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                            htmlFor: `forma_pagamento_juridica_${forma}`,
                                                            className: "cursor-pointer text-sm text-neutral-800",
                                                            children: forma
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                            lineNumber: 1095,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, forma, true, {
                                                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                    lineNumber: 1093,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                            lineNumber: 1091,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1087,
                                        columnNumber: 13
                                    }, this),
                                    errors.forma_pagamento && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-600",
                                        children: errors.forma_pagamento
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1102,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 1083,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "valor_produtos",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: [
                                            "Valor produtos e instalação ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-600",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 1107,
                                                columnNumber: 43
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1106,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "valor_produtos",
                                        value: contratoData.valor_produtos_instalacao,
                                        onChange: (e)=>handleContratoInputChange("valor_produtos_instalacao", e.target.value),
                                        className: `w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 ${errors.valor_produtos_instalacao ? "border-red-500" : "border-neutral-400"} focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900`,
                                        placeholder: "R$ 0,00"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1109,
                                        columnNumber: 13
                                    }, this),
                                    errors.valor_produtos_instalacao && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-600",
                                        children: errors.valor_produtos_instalacao
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1118,
                                        columnNumber: 50
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 1105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "valor_entrada",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: "Valor Entrada"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1122,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "valor_entrada",
                                        value: contratoData.valor_entrada,
                                        onChange: (e)=>handleContratoInputChange("valor_entrada", e.target.value),
                                        className: "w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900",
                                        placeholder: "R$ 0,00"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1125,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 1121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "valor_desconto",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: "Valor Desconto"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1135,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "valor_desconto",
                                        value: contratoData.valor_desconto,
                                        onChange: (e)=>handleContratoInputChange("valor_desconto", e.target.value),
                                        className: "w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900",
                                        placeholder: "R$ 0,00"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1138,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 1134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "quantidade_parcelas",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: "Quantidade Parcelas (Caso seja parcelado)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1148,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "quantidade_parcelas",
                                        type: "number",
                                        min: "1",
                                        value: contratoData.quantidade_parcelas,
                                        onChange: (e)=>handleContratoInputChange("quantidade_parcelas", e.target.value),
                                        className: "w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900",
                                        placeholder: "Ex.: 10"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1151,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 1147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-sm font-medium text-neutral-800",
                                        children: "Forma Pagamento das Parcelas"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1163,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                        value: contratoData.forma_pagamento_parcelas,
                                        onValueChange: (value)=>handleContratoInputChange("forma_pagamento_parcelas", value),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                "Cartão de crédito",
                                                "Transferência bancária (TED/PIX)",
                                                "Boleto bancário"
                                            ].map((forma)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                            value: forma,
                                                            id: `forma_pagamento_parcelas_juridica_${forma}`,
                                                            className: "border-2 border-neutral-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                            lineNumber: 1171,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                            htmlFor: `forma_pagamento_parcelas_juridica_${forma}`,
                                                            className: "cursor-pointer text-sm text-neutral-800",
                                                            children: forma
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                            lineNumber: 1176,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, forma, true, {
                                                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                    lineNumber: 1170,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                            lineNumber: 1168,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1164,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 1162,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "observacao_pagamento",
                                        className: "text-sm font-medium text-neutral-800",
                                        children: "Observação Sobre Pagamento"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1189,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                        id: "observacao_pagamento",
                                        rows: 3,
                                        value: contratoData.observacao_pagamento,
                                        onChange: (e)=>handleContratoInputChange("observacao_pagamento", e.target.value),
                                        className: "w-full bg-white text-neutral-900 placeholder:text-neutral-400 border-2 border-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 resize-none",
                                        placeholder: "Alguma observação adicional sobre o pagamento..."
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1192,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 1188,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                        lineNumber: 1050,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-sm font-medium text-neutral-800",
                                children: "Foto do Orçamento"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 1204,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `transition-opacity duration-300 ${hasImage ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onDragOver: handleDragOver,
                                        onDragLeave: handleDragLeave,
                                        onDrop: handleDrop,
                                        className: `border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragOver ? "border-neutral-900 bg-neutral-100" : "border-neutral-400 bg-white hover:border-neutral-600"}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                    className: "w-10 h-10 text-neutral-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                    lineNumber: 1217,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-neutral-600",
                                                    children: "Arraste e solte a imagem aqui"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                    lineNumber: 1218,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-neutral-500",
                                                    children: [
                                                        "ou pressione ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                                            className: "px-2 py-1 bg-neutral-200 rounded text-xs font-mono",
                                                            children: "Ctrl+V"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                            lineNumber: 1219,
                                                            columnNumber: 70
                                                        }, this),
                                                        " para colar"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                    lineNumber: 1219,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-neutral-400",
                                                    children: "PNG, JPG ou JPEG"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                    lineNumber: 1220,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                            lineNumber: 1216,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1206,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3 mt-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            type: "button",
                                            variant: "outline",
                                            onClick: ()=>fileInputRef.current?.click(),
                                            className: "flex-1 border-2 border-neutral-400 hover:border-neutral-900 hover:bg-neutral-100 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__["ImageIcon"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                    lineNumber: 1230,
                                                    columnNumber: 17
                                                }, this),
                                                "Selecionar Imagem"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                            lineNumber: 1224,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1223,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 1205,
                                columnNumber: 11
                            }, this),
                            hasImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative inline-block transition-opacity duration-300",
                                onMouseEnter: ()=>setShowThumbnailHover(true),
                                onMouseLeave: ()=>setShowThumbnailHover(false),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 bg-neutral-200 rounded-lg px-3 py-2 cursor-pointer group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__["ImageIcon"], {
                                            className: "w-6 h-6 text-neutral-500"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                            lineNumber: 1243,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-neutral-700 font-medium",
                                            children: "Foto do orçamento"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                            lineNumber: 1244,
                                            columnNumber: 17
                                        }, this),
                                        showThumbnailHover && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: handleRemoveImage,
                                            className: "absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center transition-opacity",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-6 h-6 text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                                lineNumber: 1250,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                            lineNumber: 1246,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                    lineNumber: 1242,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 1237,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: fileInputRef,
                                type: "file",
                                accept: "image/png,image/jpeg,image/jpg",
                                onChange: handleFileUpload,
                                className: "hidden"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 1257,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                        lineNumber: 1203,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleSubmit,
                            disabled: isSubmitting,
                            className: "w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                            children: isSubmitting ? "Gerando contrato..." : "Gerar Contrato"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                            lineNumber: 1267,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                        lineNumber: 1266,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                lineNumber: 818,
                columnNumber: 7
            }, this),
            submittedPayload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "bg-neutral-50 border-2 border-neutral-300 p-4 mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"], {
                                        className: "w-5 h-5 text-neutral-700"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1281,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-sm font-semibold text-neutral-900",
                                        children: "Informações técnicas"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                        lineNumber: 1282,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 1280,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                className: "w-5 h-5 text-green-600"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                lineNumber: 1284,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                        lineNumber: 1279,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-96 overflow-y-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs bg-white p-3 rounded border border-neutral-200 space-y-1",
                            children: Object.entries(submittedPayload).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-neutral-600 font-medium whitespace-nowrap",
                                            children: [
                                                key,
                                                ":"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                            lineNumber: 1290,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-neutral-900 flex-1 cursor-pointer hover:bg-neutral-100 px-1 rounded transition-colors",
                                            title: String(value),
                                            onClick: ()=>handleCopyValue(value),
                                            children: truncateValue(value)
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                            lineNumber: 1291,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                                    lineNumber: 1289,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                            lineNumber: 1287,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                        lineNumber: 1286,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/forms/contrato-juridica-form.tsx",
                lineNumber: 1278,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(ContratoJuridicaForm, "gyjMDvyN0bwzAvbCn2IhhPWDomc=");
_c = ContratoJuridicaForm;
var _c;
__turbopack_context__.k.register(_c, "ContratoJuridicaForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(app)/gerar-documento/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GerarDocumentoPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/checkbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$ordem$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/forms/ordem-form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$contrato$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/forms/contrato-form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$contrato$2d$juridica$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/forms/contrato-juridica-form.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function GerarDocumentoPage() {
    _s();
    const [gerarContrato, setGerarContrato] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [gerarOrdem, setGerarOrdem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [gerarAmbos, setGerarAmbos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showPreview, setShowPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [previewData, setPreviewData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tipoContrato, setTipoContrato] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const initialContratoFisicaData = {
        tipo_projeto: "",
        nome: "",
        telefone: "",
        endereco_contrato: "",
        cpf: "",
        forma_pagamento: "",
        valor_produtos_instalacao: "",
        valor_entrada: "",
        valor_desconto: "",
        quantidade_parcelas: "",
        forma_pagamento_parcelas: "",
        observacao_pagamento: "",
        data_emissao_contrato: ""
    };
    const initialContratoJuridicaData = {
        tipo_projeto: "",
        nome: "",
        telefone: "",
        endereco_contrato: "",
        cnpj: "",
        nome_representante: "",
        cpf_representante: "",
        telefone_representante: "",
        cargo_representante: "",
        forma_pagamento: "",
        valor_produtos_instalacao: "",
        valor_entrada: "",
        valor_desconto: "",
        quantidade_parcelas: "",
        forma_pagamento_parcelas: "",
        observacao_pagamento: "",
        data_emissao_contrato: ""
    };
    const [contratoData, setContratoData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialContratoFisicaData);
    const [contratoJuridicaData, setContratoJuridicaData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialContratoJuridicaData);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [errorsJuridica, setErrorsJuridica] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const handleCheckboxChange = (type)=>{
        if (type === "contrato") {
            setGerarContrato(!gerarContrato);
            setGerarOrdem(false);
            setGerarAmbos(false);
            if (gerarContrato) {
                setTipoContrato(null);
            }
        } else if (type === "ordem") {
            setGerarContrato(false);
            setGerarOrdem(!gerarOrdem);
            setGerarAmbos(false);
        } else {
            setGerarContrato(false);
            setGerarOrdem(false);
            setGerarAmbos(!gerarAmbos);
        }
    };
    const handleTipoContratoChange = (tipo)=>{
        if (tipo === "fisica") {
            setContratoJuridicaData(initialContratoJuridicaData);
            setErrorsJuridica({});
        } else if (tipo === "juridica") {
            setContratoData(initialContratoFisicaData);
            setErrors({});
        }
        setTipoContrato(tipo);
    };
    const handleSave = (data)=>{
        console.log("[v0] Ordem de Serviço:", JSON.stringify(data, null, 2));
        setPreviewData(data);
        setShowPreview(true);
    };
    // useEffect(() => {
    //   if (!isAuthenticated()) {
    //     router.push('/login')
    //   }
    // }, [router])
    // if (!isAuthenticated()) {
    //   return null
    // }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8 bg-neutral-50 min-h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold text-foreground",
                            children: "Gerar Documento"
                        }, void 0, false, {
                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-neutral-600 mt-2",
                            children: "Selecione o tipo de documento que deseja gerar"
                        }, void 0, false, {
                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "p-6 border-2 border-neutral-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold mb-4",
                            children: "Tipo de Documento"
                        }, void 0, false, {
                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                            id: "contrato",
                                            checked: gerarContrato,
                                            onCheckedChange: ()=>handleCheckboxChange("contrato"),
                                            className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                            lineNumber: 122,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "contrato",
                                            className: "cursor-pointer text-sm text-neutral-800",
                                            children: "Gerar Contrato"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                            lineNumber: 128,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                    lineNumber: 121,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                            id: "ordem",
                                            checked: gerarOrdem,
                                            onCheckedChange: ()=>handleCheckboxChange("ordem"),
                                            className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                            lineNumber: 134,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "ordem",
                                            className: "cursor-pointer text-sm text-neutral-800",
                                            children: "Gerar Ordem"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                            id: "ambos",
                                            checked: gerarAmbos,
                                            onCheckedChange: ()=>handleCheckboxChange("ambos"),
                                            className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                            lineNumber: 146,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "ambos",
                                            className: "cursor-pointer text-sm text-neutral-800",
                                            children: "Gerar Ambos"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                            lineNumber: 152,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                    lineNumber: 145,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, this),
                        gerarContrato && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 pt-6 border-t border-neutral-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-medium mb-3 text-neutral-700",
                                    children: "Tipo de Pessoa"
                                }, void 0, false, {
                                    fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                    lineNumber: 160,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                    id: "pessoa-fisica",
                                                    checked: tipoContrato === "fisica",
                                                    onCheckedChange: (checked)=>{
                                                        handleTipoContratoChange(checked ? "fisica" : null);
                                                    },
                                                    className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: "pessoa-fisica",
                                                    className: "cursor-pointer text-sm text-neutral-800",
                                                    children: "Pessoa Física"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                            lineNumber: 162,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                    id: "pessoa-juridica",
                                                    checked: tipoContrato === "juridica",
                                                    onCheckedChange: (checked)=>{
                                                        handleTipoContratoChange(checked ? "juridica" : null);
                                                    },
                                                    className: "border-2 border-neutral-500 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: "pessoa-juridica",
                                                    className: "cursor-pointer text-sm text-neutral-800",
                                                    children: "Pessoa Jurídica"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                            lineNumber: 176,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                    lineNumber: 161,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                            lineNumber: 159,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this),
                gerarContrato && tipoContrato && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        tipoContrato === "fisica" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$contrato$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContratoForm"], {
                            gerarContrato: true,
                            setGerarContrato: setGerarContrato,
                            tipoContrato: tipoContrato,
                            setTipoContrato: setTipoContrato,
                            contratoData: contratoData,
                            setContratoData: setContratoData,
                            errors: errors,
                            setErrors: setErrors
                        }, void 0, false, {
                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                            lineNumber: 197,
                            columnNumber: 15
                        }, this),
                        tipoContrato === "juridica" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$contrato$2d$juridica$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContratoJuridicaForm"], {
                            gerarContrato: true,
                            setGerarContrato: setGerarContrato,
                            tipoContrato: tipoContrato,
                            setTipoContrato: setTipoContrato,
                            contratoData: contratoJuridicaData,
                            setContratoData: setContratoJuridicaData,
                            errors: errorsJuridica,
                            setErrors: setErrorsJuridica
                        }, void 0, false, {
                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                            lineNumber: 210,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true),
                gerarOrdem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$ordem$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrdemForm"], {
                    onSave: handleSave
                }, void 0, false, {
                    fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                    lineNumber: 224,
                    columnNumber: 24
                }, this),
                gerarAmbos && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "p-6 border-2 border-neutral-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold mb-2",
                            children: "Gerar Ambos"
                        }, void 0, false, {
                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                            lineNumber: 228,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground",
                            children: "Funcionalidade em desenvolvimento..."
                        }, void 0, false, {
                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                            lineNumber: 229,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                    lineNumber: 227,
                    columnNumber: 11
                }, this),
                showPreview && previewData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "p-6 bg-white border-2 border-blue-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold",
                                            children: "Preview do Payload JSON"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                            lineNumber: 237,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-neutral-600",
                                            children: "Dados da ordem de serviço gerada"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                            lineNumber: 238,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                    lineNumber: 236,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    size: "sm",
                                    onClick: ()=>setShowPreview(false),
                                    children: "Fechar"
                                }, void 0, false, {
                                    fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                                    lineNumber: 240,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                            lineNumber: 235,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                            className: "bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-auto max-h-96 text-sm",
                            children: JSON.stringify(previewData, null, 2)
                        }, void 0, false, {
                            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                            lineNumber: 244,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(app)/gerar-documento/page.tsx",
                    lineNumber: 234,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(app)/gerar-documento/page.tsx",
            lineNumber: 112,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(app)/gerar-documento/page.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_s(GerarDocumentoPage, "izytsOfh4yUnjVa+IDLnx2u1LV8=");
_c = GerarDocumentoPage;
var _c;
__turbopack_context__.k.register(_c, "GerarDocumentoPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_ee776b79._.js.map