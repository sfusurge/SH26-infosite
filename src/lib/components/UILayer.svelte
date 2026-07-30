<script>
  import { page } from '$app/state';
  const navItems = [
    {
      key: 'I',
      label: 'INFO',
      href: '#info'
    },
    {
      key: 'W',
      label: 'THE WORKSHOP',
      href: 'https://workshop.stormhacks.com'
    },
    {
      key: 'F',
      label: 'FAQ',
      href: '#faq'
    },
    {
      key: 'C',
      label: 'CREDITS',
      href: '#credits'
    },
    {
      key: 'A',
      label: 'APPLY >',
      href: '#apply',
      variant: 'dark'
    }
  ];
</script>

<div class="ui-layer">
  <div class="brand-lockup">
    <div class="title-lockup">
      [ StormHacks 26' ]
    </div>

    <div class="subtitle-lockup">
      <span>West Canada’s Largest Hackathon</span>
      <img class="subtitle-star" src="/ui/star.webp" alt="" aria-hidden="true" />
      <span>Oct 3 + 4</span>
      <img class="subtitle-star" src="/ui/star.webp" alt="" aria-hidden="true" />
      <span>SFU Burnaby</span>
    </div>
  </div>
  
    <nav class="nav-layer" aria-label="Main navigation">
    {#each navItems as item}
        <a
            class="nav-button"
            class:nav-button-dark={item.variant === 'dark'}
            href={item.href}
            >
            <span class="nav-key">{item.key}</span>
            <span class="nav-label">{item.label}</span>
        </a>
    {/each}
    </nav>

    <button class="corner-button sound-button" aria-label="Toggle sound">
        <img src="/ui/sound.webp" alt="" />
        </button>

        <button class="corner-button expand-button" aria-label="Expand view">
        <img src="/ui/expand.webp" alt="" />
    </button>
</div>



<style>
.ui-layer {
  position: absolute;
  inset: 0;
  z-index: 20;
  pointer-events: none;
}

.brand-lockup {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #ececef;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-lockup {
  font-family: 'Exposure', sans-serif;
  font-size: 62px;
  line-height: 100%;
  font-weight: 394;
  font-variation-settings: 'EXPO' -60;

  letter-spacing: 0;
  white-space: nowrap;
}

.subtitle-lockup {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;

  font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  font-size: 16px;
  line-height: 100%;
  font-weight: 510;

  letter-spacing: 0;
  white-space: nowrap;
}

.subtitle-star {
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
}

.nav-layer {
  position: absolute;
  top: 20px;
  right: 20px;
  left: auto;

  display: flex;
  align-items: center;
  gap: 10px;

  width: max-content;
  max-width: calc(100vw - 40px);

  pointer-events: auto;
}

.nav-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  height: 33px;
  width: fit-content;
  padding: 4px 6px 6px 4px;
  border-radius: 6px;

  background: #ececef;
  color: #141417;
  text-decoration: none;

  font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  font-size: 16px;
  line-height: 100%;
  font-weight: 700;

  white-space: nowrap;
  flex: 0 0 auto;
}

.nav-key {
  display: grid;
  place-items: center;

  width: 25px;
  height: 25px;
  border-radius: 2px;

  background: #141417;
  color: #ececef;

  font-size: 14px;
  line-height: 1;
  font-weight: 700;
    transform: translateY(1px);
}

.nav-button-dark {
  background: #141417;
  color: #ececef;
  flex: 0 0 auto;
  width: fit-content;
  white-space: nowrap;

}

.nav-button-dark .nav-key {
  background: #ececef;
  color: #141417;
}

.nav-label {
  white-space: nowrap;
}

.corner-button {
  position: absolute;
  display: grid;
  place-items: center;

  width: 32px;
  height: 32px;
  padding: 2px;

  border: 0;
  border-radius: 6px;

  background: #ececef;
  pointer-events: auto;
}

.corner-button img {
  width: 100%;
  height: 100%;
  display: block;
}

.sound-button {
  left: 20px;
  bottom: 20px;
}

.expand-button {
  right: 20px;
  bottom: 20px;
}
</style>
