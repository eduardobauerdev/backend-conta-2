module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createServerClient,
    "createServerClient",
    ()=>createServerClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function createServerClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://rmhprryomxbwxabvatev.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtaHBycnlvbXhid3hhYnZhdGV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5ODQ4ODEsImV4cCI6MjA3OTU2MDg4MX0.N67umfciZ2aLKaq_YFUeVDMdkhII1cxfn5xYTuUVn3M"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // The `setAll` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
                }
            }
        }
    });
}
;
}),
"[project]/app/api/whatsapp/assignments/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])();
        const { searchParams } = new URL(request.url);
        const chatId = searchParams.get("chatId");
        if (!chatId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "chatId é obrigatório"
            }, {
                status: 400
            });
        }
        const { data: assignment, error } = await supabase.from("chat_assignments").select("*").eq("chat_id", chatId).eq("status", "active").maybeSingle();
        if (error) {
            console.error("[API] Erro ao buscar atribuição:", error);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Erro ao buscar atribuição"
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            assignment: assignment || null
        });
    } catch (error) {
        console.error("[API] Erro ao buscar atribuição:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: "Erro interno do servidor"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])();
        const body = await request.json();
        const { chatId, chatName, assignToId, assignToName, notes, autoAssign = false } = body;
        const userId = cookieStore.get("auth_user_id")?.value;
        const userName = cookieStore.get("auth_user_name")?.value;
        if (!userId || !userName) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Usuário não autenticado"
            }, {
                status: 401
            });
        }
        if (!chatId || !chatName || !assignToId || !assignToName) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Dados incompletos"
            }, {
                status: 400
            });
        }
        const { data: previousAssignment, error: fetchError } = await supabase.from("chat_assignments").select("*").eq("chat_id", chatId).eq("status", "active").maybeSingle();
        if (fetchError) {
            console.error("Erro ao buscar atribuição anterior:", fetchError);
        }
        if (previousAssignment) {
            const logData = {
                chat_id: chatId,
                chat_name: chatName,
                action: "transferred",
                from_user_id: previousAssignment.assigned_to_id,
                from_user_name: previousAssignment.assigned_to_name,
                to_user_id: assignToId,
                to_user_name: assignToName,
                performed_by_id: userId,
                performed_by_name: userName,
                notes: notes || null,
                created_at: new Date().toISOString()
            };
            const { error: logError } = await supabase.from("assignment_logs").insert(logData);
            if (logError) {
                console.error("Erro ao criar log de transferência:", logError);
            }
            const { error: deleteError } = await supabase.from("chat_assignments").delete().eq("chat_id", chatId).eq("status", "active");
            if (deleteError) {
                console.error("Erro ao remover atribuição anterior:", deleteError);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    message: "Erro ao remover atribuição anterior"
                }, {
                    status: 500
                });
            }
        }
        const newAssignmentData = {
            chat_id: chatId,
            chat_name: chatName,
            assigned_to_id: assignToId,
            assigned_to_name: assignToName,
            assigned_by_id: autoAssign ? null : userId,
            assigned_by_name: autoAssign ? null : userName,
            notes: notes || null,
            status: "active",
            assigned_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        const { data: newAssignment, error } = await supabase.from("chat_assignments").insert(newAssignmentData).select().single();
        if (error) {
            console.error("Erro ao criar atribuição:", error);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: `Erro ao atribuir conversa: ${error.message}`
            }, {
                status: 500
            });
        }
        if (!previousAssignment) {
            const logData = {
                chat_id: chatId,
                chat_name: chatName,
                action: "assigned",
                from_user_id: null,
                from_user_name: null,
                to_user_id: assignToId,
                to_user_name: assignToName,
                performed_by_id: userId,
                performed_by_name: userName,
                notes: notes || null,
                created_at: new Date().toISOString()
            };
            const { error: logError } = await supabase.from("assignment_logs").insert(logData);
            if (logError) {
                console.error("Erro ao criar log de auditoria:", logError);
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            assignment: newAssignment
        });
    } catch (error) {
        console.error("Erro geral ao atribuir conversa:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: `Erro interno do servidor: ${error instanceof Error ? error.message : "Erro desconhecido"}`
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])();
        const { searchParams } = new URL(request.url);
        const chatId = searchParams.get("chatId");
        if (!chatId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "chatId é obrigatório"
            }, {
                status: 400
            });
        }
        const { data: activeAssignment } = await supabase.from("chat_assignments").select("*").eq("chat_id", chatId).eq("status", "active").maybeSingle();
        if (activeAssignment) {
            const { error } = await supabase.from("chat_assignments").update({
                status: "completed",
                updated_at: new Date().toISOString()
            }).eq("id", activeAssignment.id);
            if (error) {
                console.error("[API] Erro ao liberar conversa:", error);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    message: "Erro ao liberar conversa"
                }, {
                    status: 500
                });
            }
            await supabase.from("assignment_logs").insert({
                chat_id: chatId,
                chat_name: activeAssignment.chat_name,
                action: "released",
                from_user_id: activeAssignment.assigned_to_id,
                from_user_name: activeAssignment.assigned_to_name,
                to_user_id: null,
                to_user_name: null,
                performed_by_id: activeAssignment.assigned_to_id,
                performed_by_name: activeAssignment.assigned_to_name,
                notes: null
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        console.error("[API] Erro ao liberar conversa:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: "Erro interno do servidor"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c3a359c9._.js.map