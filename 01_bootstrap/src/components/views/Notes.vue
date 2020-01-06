<template>
  <div>
    <button class="btn btn-primary" @click="addNotes">
      <span class="fa-stack fa-sm" style="margin-top: 0.5em;">
        <i class="fas fa-plus fa-stack-1x"></i>
        <i class="far fa-sticky-note fa-stack-2x"></i>
      </span>
      &nbsp;Add Note
    </button>
    <div class="note-board">
      <div class="row">
        <sticky-notes
          v-for="(note, index) in notes"
          :key="index"
          :post="note"
          @removeSticky="deleteSticky(index)"
          @saveSticky="confirmSticky(note, index)"
          @favorNote="sortSticky"
        >
          {{ note }}
        </sticky-notes>
      </div>
    </div>
  </div>
</template>

<script>
import StickyNotes from "@/components/views/_stickyNotes";

export default {
  components: { StickyNotes },
  data() {
    return {
      notes: [],
      oriPost: {
        content: "",
        favor: false,
        color: "#fff7ac",
        favorIcon: "far"
      },
      post: {
        content: "",
        favor: false,
        color: "#fff7ac",
        favorIcon: "far"
      }
    };
  },
  mounted() {
    if (localStorage.getItem("notes")) {
      try {
        this.notes = JSON.parse(localStorage.getItem("notes"));
        if (this.notes.length === 0) {
          this.notes.push("Try To Post a New Note!");
          let parsed = JSON.stringify(this.notes);
          localStorage.setItem("notes", parsed);
        }
      } catch (e) {
        localStorage.removeItem("notes");
      }
    }
  },
  methods: {
    addNotes() {
      this.notes.push(this.oriPost);
      this.savePosts();
    },
    savePosts() {
      if (this.notes.length > 0) {
        let parsed = JSON.stringify(this.notes);
        localStorage.setItem("notes", parsed);
      } else {
        this.notes = [];
        localStorage.removeItem("notes");
      }
    },
    deleteSticky(key) {
      this.notes.splice(key, 1);
      //   this.savePosts();
    },
    confirmSticky(note, index) {
      console.log(this.notes);
      console.log(note, index);

      this.notes[index] = note;
      this.savePosts();
    },
    sortSticky(index) {
      this.notes[index];
    }
  }
};
</script>
