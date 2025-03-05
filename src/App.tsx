import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  setup() {
    return () => {
      return (
        <div class="app-container">
          <RouterView />
        </div>
      );
    };
  },
});
