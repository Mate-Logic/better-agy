# Sub Meter

El uso de tu plan en la status line de agy, siempre abajo a la derecha: la ventana de **5 horas** y la **semanal** se turnan cada 8 segundos, como una barra con el tiempo que falta para que esa ventana se reinicie.

```text
                                                   5h ━━━━━━──── 58% · 2h 10m
```

La barra toma el color del modelo que estás usando (azul para Gemini, naranja para Claude, verde para GPT) y se pone amarilla desde el 75% y roja desde el 90%. Solo muestra la cuota de la familia del modelo en uso, así que si cambiás de modelo, cambia el medidor.

## Instalación

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.sh | bash -s -- sub-meter
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="sub-meter"; irm https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.ps1 | iex
```

El instalador te deja el medidor andando. Necesita **Python 3**. Si ya tenés otra status line configurada, no la toca y te avisa; en ese caso corré `/sub-meter` en agy, o el script de configuración con `--force`.

## Uso

```text
/sub-meter        lo activa
/sub-meter off    lo desactiva
```

## Cómo funciona

agy corre el comando de `statusLine` (`~/.gemini/antigravity-cli/settings.json`) y le pasa la sesión como JSON por stdin, con `quota` incluido: cada ventana con su `remaining_fraction` y su `reset_in_seconds`. [`scripts/statusline.py`](scripts/statusline.py) elige las ventanas del modelo en uso, las va rotando y alinea la barra a la derecha. [`scripts/setup.py`](scripts/setup.py) lo copia a `~/.gemini/antigravity-cli/sub-meter/` y apunta `statusLine` ahí, después de hacer un backup de `settings.json`.

Con una API key, o antes de la primera lectura, no hay cuota y la línea queda vacía.

Adaptado de [sub-meter](https://github.com/midudev/better-claude/tree/main/plugins/sub-meter), de midudev (MIT).
