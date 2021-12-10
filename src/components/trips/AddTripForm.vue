<template>
  <div class="add-trip-container">
    <button id="add-trip" @click="onPosting">Add Trip</button>
    <ModalRegular v-if="isPosting">
      <template v-slot:header>
        <h1>Add Trip</h1>
      </template>

      <template v-slot:body>
        <div class="trip-form-container">
          <div class="trip-type-container">
            <button class="btn primary dark profile" @click="loadOneTrip">
              Individual Trip
            </button>
          </div>

          <div class="trip-type-container">
            <button class="btn secondary dark profile" @click="showEvents">
              Events ⌵
            </button>
            <div class="event-list" v-if="ifShowEvents" :events="events">
              <EventNameBtn
                v-for="(event, index) in events"
                :key="index"
                :eventName="event.title"
              />
            </div>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <button class="btn secondary dark" @click="closeModal">Done</button>
      </template>
    </ModalRegular>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';

import ModalRegular from '../ui/ModalRegular.vue';
import EventNameBtn from '../events/EventNameBtn.vue';

export default {
  name: 'AddTripForm',
  props: ['events'],
  data() {
    return {
      isPosting: false,
      ifShowEvents: false,
    };
  },
  components: {
    ModalRegular,
    EventNameBtn,
  },
  created() {
    eventBus.$on('event-added', () => {
      this.closeModal();
    });
  },
  methods: {
    onPosting() {
      this.isPosting = true;
    },
    loadOneTrip() {
      axios
        .post('/api/trips/load')
        .then(() => {
          this.closeModal();
          eventBus.$emit('trip-feed-refresh');
          eventBus.$emit('trip-table-refresh');
        })
        .catch((error) =>
          eventBus.$emit('response-error', {
            data: error.response.data.error,
          })
        );
    },
    closeModal() {
      this.isPosting = false;
      this.ifShowEvents = false;
    },
    showEvents() {
      this.ifShowEvents = !this.ifShowEvents;
    },
  },
  watch: {
    isPosting: function () {
      if (this.isPosting) {
        document.documentElement.style.overflow = 'hidden';
        return;
      }

      document.documentElement.style.overflowY = 'auto';
    },
  },
};
</script>

<style></style>
