<template>
  <div class="status-bar">
    <div class="header">
      <span class="dot accent"></span>
      <span class="title">绝世福利姬</span>
    </div>

    <div class="stats">
      <div class="stat-item">
        <span class="stat-label">粉丝</span>
        <span class="stat-value follower">{{ formattedFollowers }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">场景</span>
        <span class="stat-value">{{ sceneLabel }}</span>
      </div>
      <div v-if="store.stat_data.是否直播中" class="stat-item live-item">
        <span class="live-dot"></span>
        <span class="stat-value live-text">直播中</span>
      </div>
    </div>

    <div v-if="hasCommissions" class="commissions">
      <div class="section-label">委托</div>
      <div
        v-for="(item, name) in store.stat_data.当前委托"
        :key="name"
        class="commission-row"
      >
        <span class="commission-client">{{ item.金主 }}</span>
        <span class="commission-sep">·</span>
        <span class="commission-content">{{ item.内容 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from './store';

const store = useDataStore();

const sceneMap: Record<string, string> = {
  自宅: '自宅',
  酒店民宿: '酒店',
  摄影棚: '摄影棚',
  夜店酒吧: '酒吧',
  商圈咖啡馆: '咖啡馆',
  漫展: '漫展',
};

const sceneLabel = computed(() => sceneMap[store.stat_data.当前场景] ?? store.stat_data.当前场景);

const formattedFollowers = computed(() => {
  const n = store.stat_data.粉丝数;
  if (n >= 10000) {
    return (n / 10000).toFixed(1).replace(/\.0$/, '') + '万';
  }
  return n.toLocaleString();
});

const hasCommissions = computed(() => {
  return Object.keys(store.stat_data.当前委托).length > 0;
});
</script>

<style lang="scss" scoped>
.status-bar {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background-color: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 13px;
  color: var(--c-text);
  line-height: 1.4;
}

.header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;

  &.accent {
    background-color: var(--c-primary);
  }
}

.title {
  font-weight: 600;
  font-size: 14px;
  color: var(--c-text);
}

.stats {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stat-label {
  color: var(--c-text-muted);
  font-size: 12px;
}

.stat-value {
  color: var(--c-text);

  &.follower {
    font-weight: 600;
    color: var(--c-primary);
  }
}

.live-item {
  .live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--c-live);
    animation: pulse 2s ease-in-out infinite;
  }

  .live-text {
    color: var(--c-live);
    font-weight: 600;
    font-size: 12px;
  }
}

.commissions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-top: 1px solid var(--c-border);
  padding-top: 10px;
}

.section-label {
  font-size: 11px;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.commission-row {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
}

.commission-client {
  font-weight: 500;
  color: var(--c-text);
}

.commission-sep {
  color: var(--c-text-muted);
}

.commission-content {
  color: var(--c-text-muted);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
