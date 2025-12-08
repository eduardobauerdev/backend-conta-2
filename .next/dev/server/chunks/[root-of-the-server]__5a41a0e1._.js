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
"[project]/frontend-ii/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createServerClient,
    "createServerClient",
    ()=>createServerClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend-ii/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-ii/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-ii/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function createServerClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://hqzjzjnzkggzrppudegv.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxemp6am56a2dnenJwcHVkZWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODYxNDcsImV4cCI6MjA4MDA2MjE0N30.vW6nKlrm6BwDbHLos-5dcwJFT31lMsHGLdD1XgMXOBY"), {
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
"[project]/frontend-ii/app/api/catalogo/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-ii/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-ii/lib/supabase/server.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])();
        const { data, error } = await supabase.from('catalogos').select('*').order('created_at', {
            ascending: false
        });
        if (error) {
            // Se a tabela não existir ou houver erro de relação, retorna array vazio
            // Códigos comuns: 42P01 (undefined_table), PGRST116 (relation not found)
            const isTableMissing = error.code === '42P01' || error.code === 'PGRST116' || error.message?.toLowerCase().includes('does not exist') || error.message?.toLowerCase().includes('relation') || error.message?.toLowerCase().includes('not found');
            if (isTableMissing) {
                console.warn('Tabela catalogos não existe no banco de dados. Execute o script 011_create_catalog_tables.sql para criá-la.');
                return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json([]);
            }
            console.error('Erro Supabase ao buscar catálogos:', error);
            throw error;
        }
        // Garante que sempre retorna um array
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data || []);
    } catch (error) {
        console.error('Erro ao buscar catálogos:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Erro ao buscar catálogos'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])();
        const body = await request.json();
        const { nome, descricao, logo_url, cor_primaria, created_by_id, created_by_name } = body;
        if (!nome) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Nome é obrigatório'
            }, {
                status: 400
            });
        }
        // Gerar slug
        const { data: slugData, error: slugError } = await supabase.rpc('generate_catalog_slug', {
            p_nome: nome
        });
        if (slugError) {
            console.error('Erro ao gerar slug:', slugError);
            // Fallback: gerar slug simples
            const baseSlug = nome.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            const { data, error } = await supabase.from('catalogos').insert({
                nome,
                slug: baseSlug + '-' + Date.now(),
                descricao,
                logo_url,
                cor_primaria,
                created_by_id,
                created_by_name
            }).select().single();
            if (error) throw error;
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
        }
        const { data, error } = await supabase.from('catalogos').insert({
            nome,
            slug: slugData,
            descricao,
            logo_url,
            cor_primaria,
            created_by_id,
            created_by_name
        }).select().single();
        if (error) throw error;
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
    } catch (error) {
        console.error('Erro ao criar catálogo:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Erro ao criar catálogo'
        }, {
            status: 500
        });
    }
}
async function PATCH(request) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])();
        const body = await request.json();
        const { id, nome, descricao, logo_url, cor_primaria, ativo } = body;
        if (!id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'ID é obrigatório'
            }, {
                status: 400
            });
        }
        const updateData = {
            updated_at: new Date().toISOString()
        };
        if (nome !== undefined) updateData.nome = nome;
        if (descricao !== undefined) updateData.descricao = descricao;
        if (logo_url !== undefined) updateData.logo_url = logo_url;
        if (cor_primaria !== undefined) updateData.cor_primaria = cor_primaria;
        if (ativo !== undefined) updateData.ativo = ativo;
        const { data, error } = await supabase.from('catalogos').update(updateData).eq('id', id).select().single();
        if (error) throw error;
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
    } catch (error) {
        console.error('Erro ao atualizar catálogo:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Erro ao atualizar catálogo'
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])();
        const body = await request.json();
        const { id } = body;
        if (!id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'ID é obrigatório'
            }, {
                status: 400
            });
        }
        const { error } = await supabase.from('catalogos').delete().eq('id', id);
        if (error) throw error;
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        console.error('Erro ao excluir catálogo:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$ii$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Erro ao excluir catálogo'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5a41a0e1._.js.map