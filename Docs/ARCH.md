# 🏛️ Parthenon Dashboard

## Arquitetura de Boot Scene — Lições do OSD-XMB

Este documento descreve **como funciona a cena de boot do OSD-XMB / XMB do PS2** e **como aplicar esses princípios corretamente no Parthenon Dashboard**, evitando problemas como *flicker*, animações travadas e lógica excessivamente complexa.

---

## 🎯 Contexto

Durante o desenvolvimento do **Parthenon Dashboard**, foi tentada a implementação de uma *boot scene* inspirada no Xbox, utilizando **vídeo convertido em frames**.
Essa abordagem causou:

* Piscadas de tela (*flicker*)
* Animação não fluída
* Texto piscando em vez de estático
* Lógica excessiva no `update()`

Esses problemas **não são falhas do desenvolvedor**, mas sim consequências de **uma arquitetura de cena inadequada para o PS2 / AthenaEnv**.

---

## 🧠 Insight Central

> **O boot do XMB não é um vídeo.**
> É uma **sequência de estados animados**, controlados por **tempo**, com **camadas persistentes** e **áudio desacoplado**.

Tudo o que parece “cinematográfico” é, na verdade, **coreografia procedural**.

---

## 🧩 Como o Boot do XMB Realmente Funciona

O boot inteiro é **uma única cena**, com estados internos:

```
BootScene
 ├─ Estado 0: Fade-in + fundo animado
 ├─ Estado 1: Logo (PS2 / XMB)
 ├─ Estado 2: Aviso de epilepsia
 ├─ Estado 3: Transição para o menu
```

⚠️ **Importante:**

* Não são várias cenas
* Não há troca de contexto
* Apenas parâmetros mudando ao longo do tempo

---

## 🎭 Componentes do Boot

### 1️⃣ Fundo animado

**O que parece:**
Um fundo vivo, com movimento suave.

**O que realmente é:**

* Uma imagem ou gradiente
* Pequenos offsets animados com seno/cosseno

```js
bgOffsetX = sin(time * 0.2) * 5;
bgOffsetY = cos(time * 0.15) * 3;
```

✔ Barato
✔ Fluído
✔ Sem I/O

---

### 2️⃣ Logo

**Comportamento:**

* Carregada uma única vez
* Alpha e escala animados

```js
logoAlpha = clamp(time / 2, 0, 1);
logoScale = 0.95 + sin(time) * 0.01;
```

✔ Persistente
✔ Nunca recriada
✔ Nunca pisca

---

### 3️⃣ Aviso de epilepsia

**Ponto crítico** para evitar texto piscando.

✔ Texto já existe desde o início
✔ Invisível até o tempo certo
✔ Fade-in suave via alpha

```js
if (time > 6) {
  warningAlpha = min((time - 6) / 1.5, 1);
}
```

❌ Não criar texto dinamicamente
❌ Não alternar draw on/off bruto

---

### 4️⃣ Áudio de fundo

**Ilusão:**
Tudo parece sincronizado ao som.

**Realidade:**

* O áudio começa no `onEnter`
* Nunca é reiniciado
* O visual apenas segue o tempo

```js
onEnter() {
  Sound.play("boot.wav");
  startTime = Timer.now();
}
```

✔ Sem stutter
✔ Sem dessincronização

---

### 5️⃣ Transição para o menu

Nada complexo:

```js
if (time > 10) {
  SceneManager.changeScene(MainMenu);
}
```

Opcionalmente com fade-out geral.

---

## 🚫 O que o OSD-XMB **não faz**

* ❌ Não usa vídeo
* ❌ Não usa sequência de frames
* ❌ Não cria/destroi objetos visuais
* ❌ Não mistura `update()` com `render()`

Esses pontos explicam **por que o XMB é fluído no PS2**.

---

## 🏗️ Arquitetura Correta de Cena

### Estrutura mínima recomendada

```
Scene
 ├─ onEnter()   → carrega assets UMA vez
 ├─ update(dt)  → apenas lógica
 ├─ render()    → apenas desenho
 └─ onExit()    → limpeza
```

### Regra de ouro

> **Nunca limpar tela ou desenhar no `update()`**

---

## ⚠️ Por que o flicker acontece

Causas comuns:

* `Graphics.clear()` fora do `render()`
* Texto desenhado no `update()`
* Fonte/asset recarregado a cada frame
* Estado visual sendo recriado

No PS2, qualquer reset visual mal controlado = flicker.

---

## 🧱 Tradução para o Parthenon (Metro-like)

O Parthenon não precisa ser XMB-like visualmente, mas **deve seguir o mesmo princípio técnico**.

### Boot Metro sugerido

```
BootScene
 ├─ Tiles de fundo deslizando
 ├─ Glow central
 ├─ Logo Parthenon
 ├─ Texto estático
 ├─ Som ambiente
```

Tudo controlado por:

```js
time → anima parâmetros
```

---

## 🧠 Máquina de estados simples (interna)

```js
if (time < 3) state = "intro";
else if (time < 6) state = "logo";
else if (time < 9) state = "warning";
else state = "exit";
```

⚠️ Sem trocar de cena.

---

## 💡 Insight Final (importante)

> **Boot não é mídia, é coreografia.**

Vídeo tira controle e performance.
Coreografia procedural dá fluidez, precisão e estabilidade.

---

## 🚀 Próximos Passos Recomendados

### Curto prazo

* ❌ Abandonar vídeo/frame sequence
* ✅ Boot baseado em tempo
* ✅ Render estável

### Médio prazo

* Helpers de animação (fade, slide, ease)
* UI primitives (Text, Image, Panel)
* Transições de cena

### Longo prazo

* Sistema de plugins
* Sistema de temas
* Boot configurável

---

📌 **Conclusão:**
A dificuldade enfrentada no boot não foi erro — foi o sinal de que o projeto está pronto para evoluir de *experimento* para *engine*.

Quando quiser, este documento pode evoluir para:

* `BOOT_ARCHITECTURE.md`
* `SCENE_SYSTEM.md`
* ou base do *engine core* do Parthenon.
