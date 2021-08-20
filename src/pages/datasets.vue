<template>
  <div class="main main--dataset">
    <div class="shell">
      <div class="dataset__row">
        <div class="dataset__left">
          <div class="intro">
            <h2>
              WELCOME TO DATASEER
              <strong>Let’s Get Started</strong>
            </h2>
          </div><!-- /.intro -->
          <Tabs>
            <Tab name="1">
              <div class="form__heading">
                <div class="form__heading-col">
                  <h5>
                    <a href="#">Dataset-6</a>
                  </h5>
                </div><!-- /.form__heading-col -->
                <div class="form__heading-col">
                  Incomplete Dataset 6
                </div><!-- /.form__heading-col -->
              </div><!-- /.form__heading -->
            </Tab>
            <Tab name="2">
              <h1>How much we do it for</h1>
            </Tab>
            <Tab name="3">
              <h1>Why we do it</h1>
            </Tab>
            <Tab name="4">
              <h1>How much we do it for</h1>
            </Tab>
            <Tab name="5">
              <h1>Why we do it</h1>
            </Tab>
            <Tab name="6">
              <h1>How much we do it for</h1>
            </Tab>
            <Tab name="7">
              <h1>Why we do it</h1>
            </Tab>
          </Tabs>
          <p>These swatches represent passages in the document which DataSeer thinks need a reference dataset</p>
          <p>Click on one, then review the corresponding form to complete each dataset</p>
          <p>If you want to merge datasets together, or add new datasets, use these tools at the bottom</p>
          <p>Finally, once all the datasets are accounted for, you can Complete Document in the top right to review your Data Availability Report.</p>
          <div class="dataset__cta">
            <Button>Great! Let’s Go</Button>
            <Button alt>I need some help</Button>
          </div><!-- /.dataset__cta -->
        </div><!-- /.dataset__left -->

        <div class="dataset__right">
          <div class="pdf-holder">
            <VuePdfEmbed :source="source" />
          </div><!-- /.pdf-holder -->
        </div><!-- /.dataset__right -->
      </div><!-- /.dataset__row -->
    </div><!-- /.shell -->
  </div><!-- /.main -->
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed';

import Button from '@/components/button/button';
import Tabs from '@/components/tabs/tabs';
import Tab from '@/components/tabs/tab';

export default {
	name: 'Datasets',

  data: function() {
    return {
      source: '/test.pdf'
    }
  },

  components: {
    Button,
    VuePdfEmbed,
    Tabs,
    Tab
  }
}
</script>
