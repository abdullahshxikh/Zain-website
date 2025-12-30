'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function HairLossSection() {
  const chartData = {
    labels: ['20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90'],
    datasets: [
      {
        label: 'WITH ZUMFALI',
        data: [65, 85, 87, 88, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 82],
        borderColor: '#bb9c30',
        backgroundColor: 'rgba(187, 156, 48, 0.1)',
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#bb9c30',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 3,
        tension: 0.4,
        fill: false,
      },
      {
        label: 'NORMAL DECLINE',
        data: [65, 85, 82, 78, 73, 68, 63, 58, 53, 48, 43, 40, 37, 35, 33],
        borderColor: '#cbc7b7',
        backgroundColor: 'rgba(203, 199, 183, 0.1)',
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#cbc7b7',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 3,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#bb9c30',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: (context: any) => `Age ${context[0].label}`,
          label: (context: any) => `${context.dataset.label}: ${context.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(203, 199, 183, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: '#888',
          font: {
            size: 11,
            family: 'Inter, sans-serif',
          },
          maxRotation: 0,
        },
        title: {
          display: true,
          text: 'AGE',
          color: '#bb9c30',
          font: {
            size: 12,
            weight: 'bold' as const,
            family: 'Inter, sans-serif',
          },
          padding: { top: 10 },
        },
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          color: 'rgba(203, 199, 183, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: '#888',
          font: {
            size: 11,
            family: 'Inter, sans-serif',
          },
          stepSize: 20,
          callback: function (value: any) {
            return value;
          },
        },
        title: {
          display: true,
          text: 'HAIR HEALTH INDEX',
          color: '#bb9c30',
          font: {
            size: 12,
            weight: 'bold' as const,
            family: 'Inter, sans-serif',
          },
          padding: { bottom: 10 },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-16 overflow-hidden" style={{
      backgroundColor: '#FAFAF9',
    }}>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif text-[#1a2f23]">
            The Decline of Hair Health: <span className="text-[#bb9c30]">A Modern Epidemic</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <motion.p
                className="text-gray-700 text-lg leading-relaxed font-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Hair loss affects over <span className="font-bold text-[#1a2f23]">50% of men and women by age 50</span>.
                Stress, poor nutrition, environmental toxins, and hormonal imbalances are destroying natural
                hair follicle health at an alarming rate.
              </motion.p>

              <motion.p
                className="text-gray-700 text-lg leading-relaxed font-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                The impact? Thinning hair, receding hairlines, and loss of confidence—making it harder to
                feel your best in work, relationships, and life.
              </motion.p>

              <motion.div
                className="pt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <p className="text-lg leading-relaxed">
                  <span className="text-[#1a2f23] font-bold text-xl font-serif">The good news:</span>
                  <span className="text-gray-700 font-light"> Zumfali helps you reclaim your hair health with natural,
                    scientifically-backed ingredients for strength, growth, and vitality.</span>
                </p>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#bb9c30] mb-2 font-serif">87%</div>
                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Saw Growth</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#1a2f23] mb-2 font-serif">3x</div>
                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Stronger Hair</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#bb9c30] mb-2 font-serif">92%</div>
                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Chart */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
              {/* Chart Legend */}
              <div className="flex justify-end gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-1 bg-[#bb9c30] rounded"></div>
                  <span className="text-xs font-bold text-[#1a2f23] tracking-wider">WITH ZUMFALI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-1 bg-[#cbc7b7] rounded"></div>
                  <span className="text-xs font-bold text-gray-400 tracking-wider">NORMAL DECLINE</span>
                </div>
              </div>

              {/* Chart Container */}
              <div className="h-[300px] sm:h-[350px] md:h-[400px]">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.button
            className="group relative px-8 sm:px-12 py-4 sm:py-5 overflow-hidden rounded-full shadow-2xl"
            style={{
              backgroundColor: '#6b8d5b',
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(187, 156, 48, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-white text-lg font-bold flex items-center gap-3">
              Protect Your Hair Today
              <motion.svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
